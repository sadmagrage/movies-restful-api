import { DataSource, Repository } from "typeorm";
import { Movie } from "./movie.entity";
import { MovieDto } from "./movie.dto";
import { Genre } from "src/genre/genre.entity";
import { User } from "src/user/user.entity";
export declare class MovieRepository extends Repository<Movie> {
    private dataSource;
    constructor(dataSource: DataSource);
    findAllAndJoinGenreAndUser(): Promise<Movie[]>;
    findById(id: string): Promise<Movie>;
    findByIdAndJoinGenreAndUser(id: string): Promise<Movie>;
    getMovieAuthorById(id: string): Promise<string>;
    createMovie(movieDto: MovieDto, genres: Genre[], user: User): Movie;
    updateMovie(movie: Movie, movieDto: MovieDto, genres: Genre[]): Movie;
}
