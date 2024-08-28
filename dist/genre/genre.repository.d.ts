import { DataSource, Repository } from "typeorm";
import { Genre } from "./genre.entity";
export declare class GenreRepository extends Repository<Genre> {
    private dataSource;
    constructor(dataSource: DataSource);
    findAllAndJoinMovie(): Promise<Genre[]>;
    findAllById(id: string[]): Promise<Genre[]>;
    findById(id: string): Promise<Genre>;
    findByIdAndJoinMovie(id: string): Promise<Genre>;
}
