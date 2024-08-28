import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { ApiBody, ApiDefaultResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { TokenDto } from "src/token/token.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOkResponse({
        description: 'Authenticated',
        type: TokenDto
    })
    @ApiUnauthorizedResponse({
        description: 'Wrong credentials'
    })
    @ApiDefaultResponse({
        description: 'Unexpected error'
    })
    @ApiBody({
        type: AuthDto,
        required: true
    })
    @Post('login')
    async login(@Res() res: Response, @Body() authDto: AuthDto) {
        const response = await this.authService.login(authDto);

        res.status(200).json(response);
    }
}