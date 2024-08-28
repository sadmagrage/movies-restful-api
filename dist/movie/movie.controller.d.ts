import { Request, Response } from "express";
import { MovieService } from "./movie.service";
import { MovieDto } from "./movie.dto";
export declare class MovieController {
    private movieService;
    constructor(movieService: MovieService);
    findAllAndJoinGenre(res: Response): Promise<void>;
    findByIdAndJoinGenre(res: Response, id: string): Promise<void>;
    save(res: Response, movieDto: MovieDto, req: Request): Promise<void>;
    update(res: Response, movieDto: MovieDto, id: string, req: Request): Promise<void>;
    delete(res: Response, id: string, req: Request): Promise<void>;
}
