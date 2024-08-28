import { Test } from "@nestjs/testing";
import { randomUUID } from "crypto";
import { Movie } from "src/movie/movie.entity";
import { User } from "src/user/user.entity";
import { Genre } from "src/genre/genre.entity";
import { RedisService } from "src/redis/redis.service";
import { RedisRepository } from "src/redis/redis.repository";

describe('RedisService', () => {

    let redisService: RedisService;
    let redisRepository: RedisRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                RedisService,
                {
                    provide: RedisRepository,
                    useValue: {
                        getData: jest.fn(),
                        saveData: jest.fn()
                    }
                }
            ]
        }).compile();

        redisService = module.get<RedisService>(RedisService);
        redisRepository = module.get<RedisRepository>(RedisRepository);

        jest.resetAllMocks();
    });
    
    const createMock = () => {
        const user = new User();
        const movie = new Movie();
        const genre = new Genre();

        user.id = randomUUID();
        user.username = 'username';
        user.password = 'password';

        movie.id = randomUUID();
        movie.duration = "5901";
        movie.genres = [genre];
        movie.postAuthor = user;

        genre.id = randomUUID();
        genre.name = "genre_name";

        delete genre.movies;

        return { user, movie, genre };
    };

    describe('getMovie', () => {
        it('Should return an instance of Movie from cache', async () => {
            const key = randomUUID();

            const { movie } = createMock();

            const data = JSON.stringify(movie);

            jest.spyOn(redisRepository, 'getData').mockResolvedValue(data);
            
            const result = await redisService.getMovie(key);

            expect(result).not.toBeNull();
            expect(redisRepository.getData).toHaveBeenCalledWith(key);
            expect(result).toEqual(movie);
        });
    });

    describe('saveMovie', () => {
        it('Should save a new instance of Movie in cache', async () => {
            const key = randomUUID();

            const { movie } = createMock();

            const stringifiedMovie = JSON.stringify(movie);

            await redisService.saveMovie(key, movie);

            expect(redisRepository.saveData).toHaveBeenCalledWith(key, stringifiedMovie);
        });
    });
});