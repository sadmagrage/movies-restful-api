import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({ example: 'JohnSummit' })
    username: string;

    @ApiProperty({ example: 'password123' })
    password: string;
}