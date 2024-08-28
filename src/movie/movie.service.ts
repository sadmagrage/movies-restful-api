import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { MovieRepository } from "./movie.repository";
import { Movie } from "./movie.entity";
import { MovieDto } from "./movie.dto";
import { GenreService } from "src/genre/genre.service";
import { MessageDto } from "src/message/message.dto";
import { validate } from "uuid";
import { UserService } from "src/user/user.service";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class MovieService {
    constructor(
        private movieRepository: MovieRepository,
        private genreService: GenreService,
        private userService: UserService,
        private redisService: RedisService
    ) {}

    async findAllAndJoinGenreAndUser(): Promise<Movie[]> {
        const movies = await this.movieRepository.findAllAndJoinGenreAndUser();

        return movies;
    }

    async findByIdAndJoinGenreAndUser(id: string): Promise<Movie> {
        const redisMovie = await this.redisService.getMovie(id);

        if (redisMovie) return redisMovie;

        const movie = await this.movieRepository.findByIdAndJoinGenreAndUser(id);

        if (!movie) throw new NotFoundException();

        await this.redisService.saveMovie(movie.id, movie);

        return movie;
    }

    async save(movieDto: MovieDto, username: string): Promise<Movie> {
        movieDto.genres = movieDto.genres.filter(genre => validate(genre));
        
        const genres = await this.genreService.findAllById(movieDto.genres);

        const user = await this.userService.findUserByUsername(username);

        const movie = this.movieRepository.createMovie(movieDto, genres, user);

        await this.movieRepository.save(movie);

        delete movie.postAuthor.id;

        return movie;
    }

    async update(movieDto: MovieDto, id: string, username: string): Promise<Movie> {
        const movie = await this.movieRepository.findById(id);

        const authorUsername = await this.movieRepository.getMovieAuthorById(id);

        if (authorUsername != username) throw new ForbiddenException();

        if (!movie) throw new NotFoundException();

        movieDto.genres = movieDto.genres.filter(genre => validate(genre));

        const genres = await this.genreService.findAllById(movieDto.genres);

        const updatedMovie = this.movieRepository.updateMovie(movie, movieDto, genres);

        await this.movieRepository.save(updatedMovie);

        return movie;
    }

    async delete(id: string, username: string): Promise<MessageDto> {
        const movie = await this.movieRepository.findById(id);

        const authorUsername = await this.movieRepository.getMovieAuthorById(id);

        if (authorUsername != username) throw new ForbiddenException();

        if (!movie) throw new NotFoundException();
        
        await this.movieRepository.delete({ id });

        const message = new MessageDto('Deleted successfully');

        return message;
    }
}