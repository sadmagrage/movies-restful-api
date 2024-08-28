import { Injectable } from "@nestjs/common";
import { RedisRepository } from "./redis.repository";
import { Movie } from "src/movie/movie.entity";

@Injectable()
export class RedisService {
    constructor(private redisRepository: RedisRepository) {}

    async getMovie(key: string): Promise<Movie> {
        const serializedData = await this.redisRepository.getData(key);

        const movie: Movie = JSON.parse(serializedData);

        return movie;
    }

    async saveMovie(key: string, movie: Movie) {
        const serializedData = JSON.stringify(movie);

        await this.redisRepository.saveData(key, serializedData);
    }
}