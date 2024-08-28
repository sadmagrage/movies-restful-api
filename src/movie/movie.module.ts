import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { MovieRepository } from "./movie.repository";
import { MovieService } from "./movie.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./movie.entity";
import { GenreModule } from "src/genre/genre.module";
import { UserModule } from "src/user/user.module";
import { RedisModule } from "src/redis/redis.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
        GenreModule,
        UserModule,
        RedisModule
    ],
    providers: [
        MovieRepository,
        MovieService
    ],
    controllers: [MovieController],
})
export class MovieModule {}