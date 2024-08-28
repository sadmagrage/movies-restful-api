import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID, UUID } from "crypto";
import { DurationDto } from "src/duration/duration.dto";

export class MovieDto {
    @ApiProperty({ example: "Up - Altas Aventuras" })
    name: string;

    @ApiProperty({ example: [randomUUID()] })
    genres: UUID[];

    @ApiProperty({ example: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/03/73/20176438.jpg" })
    image: string;

    @ApiProperty({ example: "Carl Fredricksen (Edward Asner) é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. O terreno onde a casa fica localizada interessa a um empresário, que deseja construir no local um edifício. Após um incidente em que acerta um homem com sua bengala, Carl é considerado uma ameaça pública e forçado a ser internado em um asilo. Para evitar que isto aconteça, ele enche milhares de balões em sua casa, fazendo com que ela levante vôo. O objetivo de Carl é viajar para uma floresta na América do Sul, um local onde ele e Ellie sempre desejaram morar. Só que, após o início da aventura, ele descobre que seu pior pesadelo embarcou junto: Russell (Jordan Nagai), um menino de 8 anos." })
    synopsis: string;

    @ApiProperty({ example: { hours: 1, minutes: 35 } })
    duration: DurationDto;

    @ApiProperty({ example: "2009-09-04" })
    release: string;

    @ApiProperty({ example: 4.6 })
    rating: number;

    isReleaseValid(): boolean {
        try {
            const release = this.release;

            const [ year, month, day ] = release.split("-");

            if (year == null || month == null || day == null) return false;

            if (year.split('').filter(char => /^[a-zA-Z]$/.test(char)).length != 0) return false;
            if (month.split('').filter(char => /^[a-zA-Z]$/.test(char)).length != 0) return false;
            if (day.split('').filter(char => /^[a-zA-Z]$/.test(char)).length != 0) return false;

            const date = new Date(release);

            return !isNaN(date.getTime());
        } catch (error) { return false; }
    }
}