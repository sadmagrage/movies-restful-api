import { Injectable, NotFoundException } from "@nestjs/common";
import { GenreRepository } from "./genre.repository";
import { Genre } from "./genre.entity";
import { GenreDto } from "./genre.dto";
import { MessageDto } from "src/message/message.dto";

@Injectable()
export class GenreService {
    constructor(
        private genreRepository: GenreRepository
    ) {}

    findAllAndJoinMovie(): Promise<Genre[]> {
        const genres = this.genreRepository.findAllAndJoinMovie();
        
        return genres;
    }
    
    findAllById(id: string[]): Promise<Genre[]> {
        const genres = this.genreRepository.findAllById(id);

        return genres;
    }

    async findByIdAndJoinMovie(id: string): Promise<Genre> {
        const genre = await this.genreRepository.findByIdAndJoinMovie(id);

        if (!genre) throw new NotFoundException();

        return genre;
    }

    async save(genreDto: GenreDto): Promise<Genre> {
        const genre = this.genreRepository.create(genreDto);

        await this.genreRepository.save(genre);

        return genre;
    }

    async update(genreDto: GenreDto, id: string): Promise<Genre> {
        const genre = await this.genreRepository.findById(id);

        if (!genre) throw new NotFoundException();

        genre.name = genreDto.name;

        await this.genreRepository.save(genre);

        return genre;
    }

    async delete(id: string): Promise<MessageDto> {
        const genre = await this.genreRepository.findById(id);

        if (!genre) throw new NotFoundException();

        await this.genreRepository.delete({ id });

        const message = new MessageDto('Deleted successfully');

        return message;
    }
}