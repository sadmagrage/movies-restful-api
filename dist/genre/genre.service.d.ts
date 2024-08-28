import { GenreRepository } from "./genre.repository";
import { Genre } from "./genre.entity";
import { GenreDto } from "./genre.dto";
import { MessageDto } from "src/message/message.dto";
export declare class GenreService {
    private genreRepository;
    constructor(genreRepository: GenreRepository);
    findAllAndJoinMovie(): Promise<Genre[]>;
    findAllById(id: string[]): Promise<Genre[]>;
    findByIdAndJoinMovie(id: string): Promise<Genre>;
    save(genreDto: GenreDto): Promise<Genre>;
    update(genreDto: GenreDto, id: string): Promise<Genre>;
    delete(id: string): Promise<MessageDto>;
}
