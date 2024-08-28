import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Res, UseFilters, UseGuards } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { Response } from "express";
import { GenreDto } from "./genre.dto";
import { HttpExceptionFilter } from "src/http-exception/httpException.filter";
import { validate } from "uuid";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiDefaultResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { Genre } from "./genre.entity";
import { randomUUID } from "crypto";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/role/role.guard";
import { Role } from "src/role/role.enum";
import { Roles } from "src/role/role.decorator";

@ApiTags('genre')
@Controller('genre')
@UseFilters(HttpExceptionFilter)
export class GenreController {
    constructor(
        private genreService: GenreService
    ) {}

    @Get()
    @ApiOkResponse({
        description: 'Return the list of Genres',
        type: [Genre],
        status: 200
    })
    @ApiDefaultResponse({
        description: 'Unexpected error'
    })
    async findAllAndJoinMovie(@Res() res: Response) {
        const genres = await this.genreService.findAllAndJoinMovie();

        res.status(200).json(genres);
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Return a Genre according to the id',
        type: Genre
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
    async findByIdAndJoinMovie(@Res() res: Response, @Param('id') id: string) {
        if (!validate(id)) throw new BadRequestException('Value is not an UUID');
        
        const genre = await this.genreService.findByIdAndJoinMovie(id);

        res.status(200).json(genre);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @ApiCreatedResponse({
        description: 'Create an instance of Genre and return it',
        type: Genre
    })
    @ApiDefaultResponse({
        description: 'Unexpected error'
    })
    @ApiBody({
        type: GenreDto,
        required: true
    })
    @ApiOperation({ summary: 'Require admin role' })
    async save(@Res() res: Response, @Body() genreDto: GenreDto) {
        const genre = await this.genreService.save(genreDto);

        res.status(201).json(genre);
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Update an instance of Genre according to the id and return it',
        type: Genre
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
    @ApiOperation({ summary: 'Require admin role' })
    async update(@Res() res: Response, @Body() genreDto: GenreDto, @Param('id') id: string) {
        if (!validate(id)) throw new BadRequestException('Value is not an UUID');

        const genre = await this.genreService.update(genreDto, id);

        res.status(200).json(genre);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Delete an instance of Genre according to the id',
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
    @ApiOperation({ summary: 'Require admin role' })
    async delete(@Res() res: Response, @Param('id') id: string) {
        if (!validate(id)) throw new BadRequestException('Value is not an UUID');

        const message = await this.genreService.delete(id);

        res.status(200).json(message);
    }
}