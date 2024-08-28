import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genre } from "./genre.entity";
import { GenreRepository } from "./genre.repository";
import { GenreService } from "./genre.service";
import { GenreController } from "./genre.controller";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Genre]),
        UserModule
    ],
    providers: [
        GenreRepository,
        GenreService
    ],
    controllers: [GenreController],
    exports: [
        GenreRepository,
        GenreService
    ]
})
export class GenreModule {}