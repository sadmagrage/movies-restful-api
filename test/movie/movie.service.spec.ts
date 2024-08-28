
import { Test } from "@nestjs/testing";
import { GenreService } from "src/genre/genre.service";
import { UserService } from "src/user/user.service";
import { RedisService } from "src/redis/redis.service";
import { Genre } from "src/genre/genre.entity";
import { User } from "src/user/user.entity";
import { randomUUID } from "crypto";
import { MessageDto } from "src/message/message.dto";
import { DurationDto } from "src/duration/duration.dto";
import { MovieService } from "src/movie/movie.service";
import { MovieRepository } from "src/movie/movie.repository";
import { Movie } from "src/movie/movie.entity";
import { MovieDto } from "src/movie/movie.dto";

describe('MovieService', () => {
    
    let movieService: MovieService;
    let movieRepository: MovieRepository;
    let genreService: GenreService;
    let userService: UserService;
    let redisService: RedisService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MovieService,
                {
                    provide: MovieRepository,
                    useValue: {
                        findAllAndJoinGenreAndUser: jest.fn(),
                        findByIdAndJoinGenreAndUser: jest.fn(),
                        findById: jest.fn(),
                        createMovie: jest.fn(),
                        save: jest.fn(),
                        getMovieAuthorById: jest.fn(),
                        updateMovie: jest.fn(),
                        delete: jest.fn()
                    }
                },
                {
                    provide: GenreService,
                    useValue: {
                        findAllById: jest.fn()
                    }
                },
                {
                    provide: UserService,
                    useValue: {
                        findUserByUsername: jest.fn()
                    }
                },
                {
                    provide: RedisService,
                    useValue: {
                        getMovie: jest.fn(),
                        saveMovie: jest.fn()
                    }
                }
            ]
        }).compile();

        movieService = module.get<MovieService>(MovieService);
        movieRepository = module.get<MovieRepository>(MovieRepository);
        genreService = module.get<GenreService>(GenreService);
        userService = module.get<UserService>(UserService);
        redisService = module.get<RedisService>(RedisService);

        jest.resetAllMocks();
    });

    const createMock = () => {
        const user = new User();
        const movie = new Movie();
        const genre = new Genre();

        const movieDto = new MovieDto();

        user.id = randomUUID();
        user.username = 'username';
        user.password = 'password';

        movie.id = randomUUID();
        movie.duration = "327000";
        movie.genres = [genre];
        movie.postAuthor = user;
        movie.image = "image";
        movie.name = "movie_name";
        movie.rating = 5;

        genre.id = randomUUID();
        genre.name = "genre_name";

        movieDto.duration = new DurationDto();
        movieDto.duration.hours = 2;
        movieDto.duration.minutes = 30;

        movieDto.genres = [];
        movieDto.image = "movie_dto_image";
        movieDto.name = "movie_dto_name";
        movieDto.rating = 4.5;
        movieDto.synopsis = "* text introducing the movie *";

        return { user, movie, genre, movieDto };
    };
    
    describe('findAllAndJoinGenreAndUser', () => {
        it('Should return all movies and his according user and genres', async () => {
            const { movie } = createMock();

            const movieArray: Movie[] = [movie];

            jest.spyOn(movieRepository, "findAllAndJoinGenreAndUser").mockResolvedValue(movieArray);

            const result = await movieService.findAllAndJoinGenreAndUser();

            expect(result).not.toBeNull();
            expect(movieRepository.findAllAndJoinGenreAndUser).toHaveBeenCalledWith();
            expect(result).toBe(movieArray);
        });
    });

    describe('findByIdAndJoinGenreAndUser', () => {
        it('Should return a movie by ID and his according user and genres, through database', async () => {
            const { movie } = createMock();

            const uuid = movie.id;

            jest.spyOn(redisService, "getMovie").mockResolvedValue(null);
            jest.spyOn(movieRepository, "findByIdAndJoinGenreAndUser").mockResolvedValue(movie);

            const result = await movieService.findByIdAndJoinGenreAndUser(uuid);

            expect(result).not.toBeNull();
            expect(redisService.getMovie).toHaveBeenCalledWith(uuid);
            expect(movieRepository.findByIdAndJoinGenreAndUser).toHaveBeenCalledWith(uuid);
            expect(redisService.saveMovie).toHaveBeenCalledWith(uuid, movie);
            expect(result).toEqual(movie);
        });
        
        it('Should return a movie by ID and his according user and genres, through Redis cache', async () => {
            const { movie } = createMock();

            const uuid = movie.id;

            jest.spyOn(redisService, "getMovie").mockResolvedValue(movie);

            const result = await movieService.findByIdAndJoinGenreAndUser(uuid);

            expect(result).not.toBeNull();
            expect(redisService.getMovie).toHaveBeenCalledWith(uuid);
            expect(movieRepository.findByIdAndJoinGenreAndUser).not.toHaveBeenCalled();
            expect(redisService.saveMovie).not.toHaveBeenCalled();
            expect(result).toEqual(movie);
        });
    });

    describe('save', () => {
        it('Should save a instance of Movie', async () => {
            const { movieDto, user, movie, genre } = createMock();

            jest.spyOn(genreService, 'findAllById').mockResolvedValue([genre]);
            jest.spyOn(userService, 'findUserByUsername').mockResolvedValue(user);
            jest.spyOn(movieRepository, 'createMovie').mockReturnValue(movie);

            const result = await movieService.save(movieDto, user.username);

            expect(result).not.toBeNull();
            expect(genreService.findAllById).toHaveBeenCalledWith(movieDto.genres);
            expect(userService.findUserByUsername).toHaveBeenCalledWith(user.username);
            expect(movieRepository.createMovie).toHaveBeenCalledWith(movieDto, [genre], user);
            expect(result).toBe(movie);
        });
    });

    describe('update', () => {
        it('Should change the values from the Movie entity', async () => {
            const { movieDto, movie, genre } = createMock();

            const movieId = movie.id;

            const username = 'username';

            jest.spyOn(movieRepository, 'findById').mockResolvedValue(movie);
            jest.spyOn(movieRepository, 'getMovieAuthorById').mockResolvedValue(username);
            jest.spyOn(genreService, 'findAllById').mockResolvedValue([genre]);

            const result = await movieService.update(movieDto, movieId, username);

            expect(result).not.toBeNull();
            expect(movieRepository.findById).toHaveBeenCalledWith(movieId);
            expect(movieRepository.getMovieAuthorById).toHaveBeenCalledWith(movieId);
            expect(genreService.findAllById).toHaveBeenCalledWith(movieDto.genres);
            expect(result).toBe(movie);
        });
    });

    describe('delete', () => {
        it('Should delete the movie entity', async () => {
            const { movie } = createMock();

            const movieId = movie.id;

            const username = 'username';

            movie.id = movieId;

            jest.spyOn(movieRepository, 'findById').mockResolvedValue(movie);
            jest.spyOn(movieRepository, 'getMovieAuthorById').mockResolvedValue(username);
            
            const result = await movieService.delete(movieId, username);

            const message = new MessageDto('Deleted successfully');

            expect(result).not.toBeNull();
            expect(movieRepository.findById).toHaveBeenCalledWith(movieId);
            expect(movieRepository.getMovieAuthorById).toHaveBeenCalledWith(movieId);
            expect(result).toEqual(message);
        });
    });
});