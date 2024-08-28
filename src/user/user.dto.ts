import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ example: "JohnSummit" })
    username: string;

    @ApiProperty({ example: 'password123' })
    password: string;
}