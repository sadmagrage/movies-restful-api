import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { Genre } from "src/genre/genre.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty({ example: randomUUID() })
    id: string;

    @Column()
    @ApiProperty({ example: "Up - Altas Aventuras" })
    name: string;

    @ManyToMany(() => Genre, genre => genre.movies, { onDelete: "CASCADE" })
    @ApiProperty({ example: [{ id: randomUUID(), name: "Horror"}] })
    genres: Genre[];

    @Column()
    @ApiProperty({ example: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/03/73/20176438.jpg" })
    image: string;

    @Column()
    @ApiProperty({ example: "Carl Fredricksen (Edward Asner) é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. O terreno onde a casa fica localizada interessa a um empresário, que deseja construir no local um edifício. Após um incidente em que acerta um homem com sua bengala, Carl é considerado uma ameaça pública e forçado a ser internado em um asilo. Para evitar que isto aconteça, ele enche milhares de balões em sua casa, fazendo com que ela levante vôo. O objetivo de Carl é viajar para uma floresta na América do Sul, um local onde ele e Ellie sempre desejaram morar. Só que, após o início da aventura, ele descobre que seu pior pesadelo embarcou junto: Russell (Jordan Nagai), um menino de 8 anos." })
    synopsis?: string;

    @Column()
    @ApiProperty({ example: "5700" })
    duration: string;

    @Column()
    @ApiProperty({ example: "2009-09-04" })
    release?: string;
    
    @Column({ type: "decimal", scale: 2 })
    @ApiProperty({ example: 4.6 })
    rating: number;

    @ManyToOne(() => User, user => user.postedMovies, { onDelete: 'CASCADE' })
    @JoinColumn()
    @ApiProperty({ example: { username: "JohnSummit" } })
    postAuthor: User;
}