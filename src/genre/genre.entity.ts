import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { Movie } from "src/movie/movie.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty({ example: randomUUID() })
    id: string;

    @Column()
    @ApiProperty({ example: "Horror" })
    name: string;

    @ManyToMany(() => Movie, movie => movie.genres)
    @JoinTable()
    @ApiProperty({ example: [{ id: randomUUID(), name: "Up - Altas Aventuras", image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/03/73/20176438.jpg" }] })
    movies: Movie[];
}