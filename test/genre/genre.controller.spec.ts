import { CanActivate, INestApplication } from "@nestjs/common";
import { GenreService } from "../../src/genre/genre.service";
import { GenreController } from "../../src/genre/genre.controller";
import { Test } from "@nestjs/testing";
import { AuthGuard } from "src/auth/auth.guard";
import { Genre } from "../../src/genre/genre.entity";
import * as request from 'supertest';
import { randomUUID } from "crypto";
import { GenreDto } from "../../src/genre/genre.dto";
import { MessageDto } from "src/message/message.dto";
import { Movie } from "src/movie/movie.entity";
import { User } from "src/user/user.entity";
import { RoleGuard } from "src/role/role.guard";

describe('GenreController', () => {

    let app: INestApplication;
    
    let genreService: GenreService;

    beforeAll(async () => {
        const mockAuthGuard: CanActivate = { canActivate: jest.fn().mockReturnValue(true) };

        const mockRoleGuard: CanActivate = { canActivate: jest.fn().mockReturnValue(true) };
        
        const module = await Test.createTestingModule({
            controllers: [GenreController],
            providers: [
                {
                    provide: GenreService,
                    useValue: {
                        findAllAndJoinMovie: jest.fn(),
                        findByIdAndJoinMovie: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        })
        .overrideGuard(AuthGuard).useValue(mockAuthGuard)
        .overrideGuard(RoleGuard).useValue(mockRoleGuard)
        .compile();

        genreService = module.get<GenreService>(GenreService);

        app = module.createNestApplication();
        await app.init();
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
        movie.duration = "7600";
        movie.postAuthor = user;
        movie.image = "image";
        movie.name = "movie_name";
        movie.rating = 5;

        genreDto.name = "genre_dto_name";

        return { user, movie, genre, genreDto };
    };

    describe('findAllAndJoinMovie', () => {
        it('/GET genre', async () => {
            const { genre } = createMock();

            const genres = [genre];

            jest.spyOn(genreService, "findAllAndJoinMovie").mockResolvedValue(genres);

            const result = await request(app.getHttpServer())
                .get('/genre');

            expect(genreService.findAllAndJoinMovie).toHaveBeenCalled();
            expect(result.status).toBe(200);
            expect(result.body).toEqual(genres);
        });
    });

    describe('findByIdAndJoinMovie', () => {
        it('/GET genre/:id', async () => {
            const { genre } = createMock();

            const id = genre.id;

            jest.spyOn(genreService, "findByIdAndJoinMovie").mockResolvedValue(genre);

            const result = await request(app.getHttpServer())
                .get(`/genre/${ id }`);

            expect(genreService.findByIdAndJoinMovie).toHaveBeenCalledWith(id);
            expect(result.status).toBe(200);
            expect(result.body).toEqual(genre);
        });
    });

    describe('save', () => {
        it('/POST genre', async () => {
            const { genre, genreDto } = createMock();

            jest.spyOn(genreService, "save").mockResolvedValue(genre);

            const result = await request(app.getHttpServer())
                .post('/genre')
                .accept('application/json')
                .send(genreDto);

            expect(genreService.save).toHaveBeenCalledWith(genreDto);
            expect(result.status).toBe(201);
            expect(result.body).toEqual(genre);
        });
    });

    describe('update', () => {
        it('/PUT genre/:id', async () => {
            const { genre, genreDto } = createMock();

            const id = genre.id;

            jest.spyOn(genreService, 'update').mockResolvedValue(genre);

            const result = await request(app.getHttpServer())
                .put(`/genre/${ id }`)
                .accept('application/json')
                .send(genreDto);

            expect(genreService.update).toHaveBeenCalledWith(genreDto, id);
            expect(result.status).toBe(200);
            expect(result.body).toEqual(genre);
        });
    });

    describe('delete', () => {
        it('/DELETE genre/:id', async () => {
            const { genre } = createMock();

            const id = genre.id;

            const message = new MessageDto('Deleted successfully');

            jest.spyOn(genreService, 'delete').mockResolvedValue(message);

            const result = await request(app.getHttpServer())
                .delete(`/genre/${ id }`);

            expect(genreService.delete).toHaveBeenCalledWith(id);
            expect(result.status).toBe(200);
            expect(result.body).toEqual(message);
        });
    });
});