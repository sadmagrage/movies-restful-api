import { ApiProperty } from "@nestjs/swagger";

export class GenreDto {
    @ApiProperty({ example: "Horror" })
    name: string;
}