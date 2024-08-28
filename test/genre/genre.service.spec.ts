import { Test } from "@nestjs/testing";
import { GenreRepository } from "../../src/genre/genre.repository";
import { GenreService } from "../../src/genre/genre.service";
import { Genre } from "../../src/genre/genre.entity";
import { randomUUID } from "crypto";
import { GenreDto } from "../../src/genre/genre.dto";
import { MessageDto } from "src/message/message.dto";
import { Movie } from "src/movie/movie.entity";
import { User } from "src/user/user.entity";

describe('GenreService', () => {

    let genreService: GenreService;
    let genreRepository: GenreRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                GenreService,
                {
                    provide: GenreRepository,
                    useValue: {
                        findAllAndJoinMovie: jest.fn(),
                        findAllById: jest.fn(),
                        findById: jest.fn(),
                        findByIdAndJoinMovie: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        }).compile();

        genreService = module.get<GenreService>(GenreService);
        genreRepository = module.get<GenreRepository>(GenreRepository);

        jest.resetAllMocks();
    });

    const createMock = () => {
        const user = new User();
        const movie = new Movie();
        const genre = new Genre();

        const genreDto = new GenreDto();

        user.id = randomUUID();
        user.username = 'username';
        user.password = 'password';

        genre.id = randomUUID();
        genre.name = "genre_name";
        genre.movies = [movie];

        movie.id = randomUUID();
        movie.duration = "8900";
        movie.postAuthor = user;
        movie.image = "image";
        movie.name = "movie_name";
        movie.rating = 5;

        genreDto.name = "genre_dto_name";

        return { user, movie, genre, genreDto };
    };

    describe('findAllAndJoinMovie', () => {
        it('Should return all genres and movies related', async () => {
            const { genre } = createMock();

            const genres = [genre];

            jest.spyOn(genreRepository, "findAllAndJoinMovie").mockResolvedValue(genres);

            const result = await genreService.findAllAndJoinMovie();

            expect(result).not.toBeNull();
            expect(genreRepository.findAllAndJoinMovie).toHaveBeenCalled();
            expect(result).toBe(genres);
        });
    });

    describe('findAllById', () => {
        it('Should return one genre according to id and movies related', async () => {
            const { genre } = createMock();

            const genres = [genre];
            
            const id = genre.id;

            jest.spyOn(genreRepository, "findAllById").mockResolvedValue(genres);

            const result = await genreService.findAllById([id]);

            expect(result).not.toBeNull();
            expect(genreRepository.findAllById).toHaveBeenCalledWith([id]);
            expect(result).toBe(genres);
        });
    });

    describe('save', () => {
        it('Should save a new instance of Genre', async () => {
            const { genre, genreDto } = createMock();

            jest.spyOn(genreRepository, 'create').mockReturnValue(genre);
            
            const result = await genreService.save(genreDto);

            expect(result).not.toBeNull();
            expect(genreRepository.create).toHaveBeenCalledWith(genreDto);
            expect(genreRepository.save).toHaveBeenCalledWith(genre);
            expect(result).toBe(genre);
        });
    });

    describe('update', () => {
        it('Should update values from an existing Genre instance', async () => {
            const { genre, genreDto } = createMock();

            const id = genre.id;

            jest.spyOn(genreRepository, 'findById').mockResolvedValue(genre);

            const result = await genreService.update(genreDto, id);

            expect(result).not.toBeNull();
            expect(genreRepository.findById).toHaveBeenCalledWith(id);
            expect(genreRepository.save).toHaveBeenCalledWith(genre);
            expect(result).toBe(genre);
        });
    });

    describe('delete', () => {
        it('Should delete an instace of Genre', async () => {
            const { genre } = createMock();

            const id = genre.id;

            const message = new MessageDto("Deleted successfully");

            jest.spyOn(genreRepository, 'findById').mockResolvedValue(genre);

            const result = await genreService.delete(id);

            expect(result).not.toBeNull();
            expect(genreRepository.delete).toHaveBeenCalledWith({ id });
            expect(result).toEqual(message);
        });
    });
});