import { MovieRepository } from "./movie.repository";
import { Movie } from "./movie.entity";
import { MovieDto } from "./movie.dto";
import { GenreService } from "src/genre/genre.service";
import { MessageDto } from "src/message/message.dto";
import { UserService } from "src/user/user.service";
import { RedisService } from "src/redis/redis.service";
export declare class MovieService {
    private movieRepository;
    private genreService;
    private userService;
    private redisService;
    constructor(movieRepository: MovieRepository, genreService: GenreService, userService: UserService, redisService: RedisService);
    findAllAndJoinGenreAndUser(): Promise<Movie[]>;
    findByIdAndJoinGenreAndUser(id: string): Promise<Movie>;
    save(movieDto: MovieDto, username: string): Promise<Movie>;
    update(movieDto: MovieDto, id: string, username: string): Promise<Movie>;
    delete(id: string, username: string): Promise<MessageDto>;
}
