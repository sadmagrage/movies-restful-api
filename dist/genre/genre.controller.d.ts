import { GenreService } from "./genre.service";
import { Response } from "express";
import { GenreDto } from "./genre.dto";
export declare class GenreController {
    private genreService;
    constructor(genreService: GenreService);
    findAllAndJoinMovie(res: Response): Promise<void>;
    findByIdAndJoinMovie(res: Response, id: string): Promise<void>;
    save(res: Response, genreDto: GenreDto): Promise<void>;
    update(res: Response, genreDto: GenreDto, id: string): Promise<void>;
    delete(res: Response, id: string): Promise<void>;
}
