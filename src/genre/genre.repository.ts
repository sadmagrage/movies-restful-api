import { Injectable } from "@nestjs/common";
import { DataSource, In, Repository } from "typeorm";
import { Genre } from "./genre.entity";

@Injectable()
export class GenreRepository extends Repository<Genre> {
    constructor(private dataSource: DataSource) {
        super(Genre, dataSource.createEntityManager());
    }

    async findAllAndJoinMovie(): Promise<Genre[]> {
        const genres = await this.createQueryBuilder('genre')
            .select(['genre', 'movie.id', 'movie.name', 'movie.image'])
            .leftJoin('genre.movies', 'movie')
            .getMany();
        
        return genres;
    }

    async findAllById(id: string[]): Promise<Genre[]> {
        const genres = this.find({ where: { id: In(id) } });

        return genres;
    }

    async findById(id: string): Promise<Genre> {
        const genre = this.findOneBy({ id });

        return genre;
    }

    async findByIdAndJoinMovie(id: string): Promise<Genre> {
        const genre = await this.createQueryBuilder('genre')
            .select(['genre', 'movie.id', 'movie.name'])
            .leftJoin('genre.movies', 'movie')
            .where("genre.id = :id", { id })
            .getOne();
        
        return genre;
    }
}