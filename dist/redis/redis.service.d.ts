import { RedisRepository } from "./redis.repository";
import { Movie } from "src/movie/movie.entity";
export declare class RedisService {
    private redisRepository;
    constructor(redisRepository: RedisRepository);
    getMovie(key: string): Promise<Movie>;
    saveMovie(key: string, movie: Movie): Promise<void>;
}
