import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { Movie } from "src/movie/movie.entity";
import { Role } from "src/role/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ example: randomUUID() })
    id: string;

    @Column({ unique: true, nullable: false })
    @ApiProperty({ example: "JohnSummit" })
    username: string;

    @Column({ nullable: false })
    @ApiProperty({ example: "$2a$12$czsdBnlRlyyvaeqymJgzN.bE55XE1NPVuc9aeCY5oX64FhyQMptW6" })
    password: string;

    @OneToMany(() => Movie, movie => movie.postAuthor, { onDelete: 'CASCADE' })
    @ApiProperty({ example: {
        "id": "0e1bf34e-d682-4837-8f6a-cc79771e8cd4",
        "name": "Up - Altas Aventuras",
        "genres": [
          {
            "id": "9bd076b2-37e4-4a78-b46f-472c55de6528",
            "name": "Horror"
          }
        ],
        "image": "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/03/73/20176438.jpg",
        "synopsis": "Carl Fredricksen (Edward Asner) é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. O terreno onde a casa fica localizada interessa a um empresário, que deseja construir no local um edifício. Após um incidente em que acerta um homem com sua bengala, Carl é considerado uma ameaça pública e forçado a ser internado em um asilo. Para evitar que isto aconteça, ele enche milhares de balões em sua casa, fazendo com que ela levante vôo. O objetivo de Carl é viajar para uma floresta na América do Sul, um local onde ele e Ellie sempre desejaram morar. Só que, após o início da aventura, ele descobre que seu pior pesadelo embarcou junto: Russell (Jordan Nagai), um menino de 8 anos.",
        "duration": "5700",
        "release": "2009-09-04",
        "rating": 4.6
    }})
    postedMovies: Movie[];

    @Column()
    @ApiProperty({ example: Role.User })
    role: Role;
}