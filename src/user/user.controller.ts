import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { Response } from "express";
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiDefaultResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    @ApiCreatedResponse({
        description: 'User successfully created'
    })
    @ApiConflictResponse({
        description: 'Conflict: Username already exists'
    })
    @ApiDefaultResponse({
        description: 'Unexpected error'
    })
    @ApiBody({
        type: UserDto,
        required: true
    })
    async register(@Res() res: Response, @Body() userDto: UserDto) {
        const response = await this.userService.saveUser(userDto);

        res.status(201).json(response);
    }
}