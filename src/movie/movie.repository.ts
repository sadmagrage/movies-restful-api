import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Movie } from "./movie.entity";
import { MovieDto } from "./movie.dto";
import { Genre } from "src/genre/genre.entity";
import { User } from "src/user/user.entity";
import { DurationDto } from "src/duration/duration.dto";

@Injectable()
export class MovieRepository extends Repository<Movie> {
    constructor(private dataSource: DataSource) {
        super(Movie, dataSource.createEntityManager());
    }

    async findAllAndJoinGenreAndUser(): Promise<Movie[]> {
        const movies = this.createQueryBuilder('movie')
            .select(['movie.id', 'movie.name', 'movie.image', 'genre', 'user.username'])
            .leftJoin('movie.genres', 'genre')
            .leftJoin('movie.postAuthor', 'user')
            .getMany();

        return movies;
    }

    async findById(id: string): Promise<Movie> {
        const movie = this.findOneBy({ id });

        return movie
    }

    async findByIdAndJoinGenreAndUser(id: string):  Promise<Movie> {
        const movies = this.createQueryBuilder('movie')
            .select(['movie', 'genre', 'user.username'])
            .leftJoin('movie.genres', 'genre')
            .leftJoin('movie.postAuthor', 'user')
            .where("movie.id = :id", { id })
            .getOne();

        return movies;
    }

    async getMovieAuthorById(id: string): Promise<string> {
        const [ { username } ] = await this.query(`
            select username from movie
                inner join "user"
                    on "user".id = movie."postAuthorId"
                        where movie.id = '${ id }'`);
        
        return username;
    }

    createMovie(movieDto: MovieDto, genres: Genre[], user: User): Movie {
        movieDto = Object.assign(new MovieDto(), movieDto);
        movieDto.duration = Object.assign(new DurationDto(), movieDto.duration);
        
        if (!movieDto.isReleaseValid()) throw new BadRequestException("Release property value is invalid");

        const movie = new Movie();

        movie.name = movieDto.name;
        movie.genres = genres;
        movie.postAuthor = user;
        movie.duration = movieDto.duration.getSeconds();
        movie.image = movieDto.image;
        movie.synopsis = movieDto.synopsis;
        movie.release = movieDto.release;
        
        if (movieDto.rating > 5.0 || movieDto.rating < 0.0) throw new BadRequestException("Rating property value must be between 0 and 5.0");
                    
        movie.rating = movieDto.rating;

        return movie;
    }

    updateMovie(movie: Movie, movieDto: MovieDto, genres: Genre[]): Movie {
        movieDto = Object.assign(new MovieDto(), movieDto);
        movieDto.duration = Object.assign(new DurationDto(), movieDto.duration);
        
        if (!movieDto.isReleaseValid()) throw new BadRequestException("Release property value is invalid");
        
        movie.name = movieDto.name;
        movie.genres = genres;
        movie.duration = movieDto.duration.getSeconds();
        movie.image = movieDto.image;
        movie.synopsis = movieDto.synopsis;
        movie.release = movieDto.release;
        
        if (movieDto.rating > 5.0 || movieDto.rating < 0.0) throw new BadRequestException("Rating property value must be between 0 and 5.0");
                    
        movie.rating = movieDto.rating;

        return movie;
    }
}