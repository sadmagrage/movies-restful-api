import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { MovieService } from "./movie.service";
import { MovieDto } from "./movie.dto";
import { HttpExceptionFilter } from "src/http-exception/httpException.filter";
import { validate } from "uuid";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiDefaultResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Movie } from "./movie.entity";
import { randomUUID } from "crypto";

@ApiTags('movie')
@Controller('movie')
@UseFilters(HttpExceptionFilter)
export class MovieController {
    constructor(private movieService: MovieService) {}

    @Get()
    @ApiOkResponse({
        description: 'Return the list of Movies',
        type: [Movie],
        status: 200
    })
    @ApiDefaultResponse({
        description: 'Unexpected error'
    })
    async findAllAndJoinGenre(@Res() res: Response) {
        const movies = await this.movieService.findAllAndJoinGenreAndUser();

        res.status(200).json(movies);
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Return a Movie according to the id',
        type: Movie
    })
    @ApiBadRequestResponse({
        description: 'Invalid UUID'
    })
    @ApiNotFoundResponse({
        description: 'Not found'
    })
    @ApiDefaultResponse({
        description: 'Unexpected error'
    })
    @ApiParam({
        name: 'id',
        example: randomUUID()
    })
    async findByIdAndJoinGenre(@Res() res: Response, @Param('id') id: string) {
        if (!validate(id)) throw new BadRequestException('Value is not an UUID');

        const movie = await this.movieService.findByIdAndJoinGenreAndUser(id);

        res.status(200).json(movie);            
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({
        description: 'Create an instance of Movie and return it',
        type: Movie
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized, invalid or missing token'
    })
    @ApiDefaultResponse({
        description: 'Unexpected error'
    })
    @ApiBody({
        type: MovieDto,
        required: true
    })
    async save(@Res() res: Response, @Body() movieDto: MovieDto, @Req() req: Request) {
        const { username } = req['user'];

        const movie = await this.movieService.save(movieDto, username);

        res.status(201).json(movie);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Update an instance of Movie according to the id and return it',
        type: Movie
    })
    @ApiBadRequestResponse({
        description: 'Invalid UUID'
    })
    @ApiNotFoundResponse({
        description: 'Not found'
    })
    @ApiDefaultResponse({
        description: 'Unexpected error'
    })
    @ApiParam({
        name: 'id',
        example: randomUUID()
    })
    @ApiBody({
        type: MovieDto,
        required: true
    })
    async update(@Res() res: Response, @Body() movieDto: MovieDto, @Param('id') id: string, @Req() req: Request) {
        const { username } = req['user'];

        if (!validate(id)) throw new BadRequestException('Value is not an UUID');

        const movie = await this.movieService.update(movieDto, id, username);

        res.status(200).json(movie);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Delete an instance of Movie according to the id',
    })
    @ApiBadRequestResponse({
        description: 'Invalid UUID'
    })
    @ApiNotFoundResponse({
        description: 'Not found'
    })
    @ApiDefaultResponse({
        description: 'Unexpected error'
    })
    @ApiParam({
        name: 'id',
        example: randomUUID()
    })
    async delete(@Res() res: Response, @Param('id') id: string, @Req() req: Request) {
        const { username } = req['user'];

        if (!validate(id)) throw new BadRequestException('Value is not an UUID');
        
        const message = await this.movieService.delete(id, username);

        res.status(200).json(message);
    }
}