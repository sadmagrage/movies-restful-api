import { CanActivate, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AuthGuard } from "src/auth/auth.guard";
import { randomUUID } from "crypto";
import { MessageDto } from "src/message/message.dto";
import { User } from "src/user/user.entity";
import { Genre } from "src/genre/genre.entity";
import { DurationDto } from "src/duration/duration.dto";
import { MovieService } from "src/movie/movie.service";
import { Movie } from "src/movie/movie.entity";
import { MovieDto } from "src/movie/movie.dto";
import { MovieController } from "src/movie/movie.controller";

describe('MovieController', () => {
    
    let app: INestApplication;
    let createMock: Function;
    
    let movieService: MovieService;

    beforeEach(() => {
        createMock = () => {
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
    });

    beforeAll(async () => {
        const mockAuthGuard: CanActivate = { canActivate: jest.fn().mockImplementation(
            context => {
                const req: Request = context.switchToHttp().getRequest();

                let token = req.headers["authorization"];

                token = token.replace('Bearer ', '');

                req['user'] = { username: 'username' };

                return token ? true : false;
            }
        ) };

        const module = await Test.createTestingModule({
            controllers: [MovieController],
            providers: [
                {
                    provide: MovieService,
                    useValue: {
                        findAllAndJoinGenreAndUser: jest.fn(),
                        findByIdAndJoinGenreAndUser: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn()
                    }
                }   
            ]
        })
        .overrideGuard(AuthGuard).useValue(mockAuthGuard)
        .compile();

        movieService = module.get<MovieService>(MovieService);

        app = module.createNestApplication();
        await app.init();
    });


    describe('findAllAndJoinGenre', () => {
        it('/GET movie', async () => {
            const { movie } = createMock();

            const movieList = [movie];

            jest.spyOn(movieService, 'findAllAndJoinGenreAndUser').mockResolvedValue(movieList);

            const response = await request(app.getHttpServer())
                .get('/movie');
            
            expect(movieService.findAllAndJoinGenreAndUser).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(movieList);
        });
    });

    describe('findByIdAndJoinGenre', () => {
        it('/GET movie/:id', async () => {
            const { movie } = createMock();

            const id = movie.id;

            jest.spyOn(movieService, 'findByIdAndJoinGenreAndUser').mockResolvedValue(movie);

            const response = await request(app.getHttpServer())
                .get(`/movie/${ id }`);
            
            expect(movieService.findByIdAndJoinGenreAndUser).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(movie);
        });
    });

    describe('save', () => {
        it('/POST movie', async () => {
            const token = 'token';
            const username = 'username';
            
            const { movie, movieDto } = createMock();

            jest.spyOn(movieService, 'save').mockResolvedValue(movie);

            const response = await request(app.getHttpServer())
                .post(`/movie`)
                .accept('application/json')
                .send(movieDto)
                .auth(token, { type: "bearer" });

            expect(movieService.save).toHaveBeenCalledWith(movieDto, username);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(movie);
        });
    });

    describe('update', () => {
        it('/PUT movie/:id', async () => {
            const id = randomUUID();
            const token = 'token';
            const username = 'username';
            const movieDto = new MovieDto();
            const movie = new Movie();

            jest.spyOn(movieService, 'update').mockResolvedValue(movie);

            const response = await request(app.getHttpServer())
                .put(`/movie/${ id }`)
                .auth(token, { type: "bearer" });

            expect(movieService.update).toHaveBeenCalledWith(movieDto, id, username);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(movie);
        });
    });

    describe('delete', () => {
        it('/DELETE movie/:id', async () => {
            const { movie } = createMock();

            const id = movie.id;

            const token = 'token';
            const username = 'username';
            const message = new MessageDto('Deleted successfully');

            jest.spyOn(movieService, 'delete').mockResolvedValue(message);
    
            const response = await request(app.getHttpServer())
                .delete(`/movie/${ id }`)
                .auth(token, { type: "bearer" });
    
            expect(movieService.delete).toHaveBeenCalledWith(id, username);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(message);
        });
    });
});