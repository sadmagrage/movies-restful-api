"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const movie_entity_1 = require("./movie.entity");
const movie_dto_1 = require("./movie.dto");
const duration_dto_1 = require("../duration/duration.dto");
let MovieRepository = class MovieRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(movie_entity_1.Movie, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findAllAndJoinGenreAndUser() {
        const movies = this.createQueryBuilder('movie')
            .select(['movie.id', 'movie.name', 'movie.image', 'genre', 'user.username'])
            .leftJoin('movie.genres', 'genre')
            .leftJoin('movie.postAuthor', 'user')
            .getMany();
        return movies;
    }
    async findById(id) {
        const movie = this.findOneBy({ id });
        return movie;
    }
    async findByIdAndJoinGenreAndUser(id) {
        const movies = this.createQueryBuilder('movie')
            .select(['movie', 'genre', 'user.username'])
            .leftJoin('movie.genres', 'genre')
            .leftJoin('movie.postAuthor', 'user')
            .where("movie.id = :id", { id })
            .getOne();
        return movies;
    }
    async getMovieAuthorById(id) {
        const [{ username }] = await this.query(`
            select username from movie
                inner join "user"
                    on "user".id = movie."postAuthorId"
                        where movie.id = '${id}'`);
        return username;
    }
    createMovie(movieDto, genres, user) {
        movieDto = Object.assign(new movie_dto_1.MovieDto(), movieDto);
        movieDto.duration = Object.assign(new duration_dto_1.DurationDto(), movieDto.duration);
        if (!movieDto.isReleaseValid())
            throw new common_1.BadRequestException("Release property value is invalid");
        const movie = new movie_entity_1.Movie();
        movie.name = movieDto.name;
        movie.genres = genres;
        movie.postAuthor = user;
        movie.duration = movieDto.duration.getSeconds();
        movie.image = movieDto.image;
        movie.synopsis = movieDto.synopsis;
        movie.release = movieDto.release;
        if (movieDto.rating > 5.0 || movieDto.rating < 0.0)
            throw new common_1.BadRequestException("Rating property value must be between 0 and 5.0");
        movie.rating = movieDto.rating;
        return movie;
    }
    updateMovie(movie, movieDto, genres) {
        movieDto = Object.assign(new movie_dto_1.MovieDto(), movieDto);
        movieDto.duration = Object.assign(new duration_dto_1.DurationDto(), movieDto.duration);
        if (!movieDto.isReleaseValid())
            throw new common_1.BadRequestException("Release property value is invalid");
        movie.name = movieDto.name;
        movie.genres = genres;
        movie.duration = movieDto.duration.getSeconds();
        movie.image = movieDto.image;
        movie.synopsis = movieDto.synopsis;
        movie.release = movieDto.release;
        if (movieDto.rating > 5.0 || movieDto.rating < 0.0)
            throw new common_1.BadRequestException("Rating property value must be between 0 and 5.0");
        movie.rating = movieDto.rating;
        return movie;
    }
};
exports.MovieRepository = MovieRepository;
exports.MovieRepository = MovieRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], MovieRepository);
//# sourceMappingURL=movie.repository.js.map