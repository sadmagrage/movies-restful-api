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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const movie_repository_1 = require("./movie.repository");
const genre_service_1 = require("../genre/genre.service");
const message_dto_1 = require("../message/message.dto");
const uuid_1 = require("uuid");
const user_service_1 = require("../user/user.service");
const redis_service_1 = require("../redis/redis.service");
let MovieService = class MovieService {
    constructor(movieRepository, genreService, userService, redisService) {
        this.movieRepository = movieRepository;
        this.genreService = genreService;
        this.userService = userService;
        this.redisService = redisService;
    }
    async findAllAndJoinGenreAndUser() {
        const movies = await this.movieRepository.findAllAndJoinGenreAndUser();
        return movies;
    }
    async findByIdAndJoinGenreAndUser(id) {
        const redisMovie = await this.redisService.getMovie(id);
        if (redisMovie)
            return redisMovie;
        const movie = await this.movieRepository.findByIdAndJoinGenreAndUser(id);
        if (!movie)
            throw new common_1.NotFoundException();
        await this.redisService.saveMovie(movie.id, movie);
        return movie;
    }
    async save(movieDto, username) {
        movieDto.genres = movieDto.genres.filter(genre => (0, uuid_1.validate)(genre));
        const genres = await this.genreService.findAllById(movieDto.genres);
        const user = await this.userService.findUserByUsername(username);
        const movie = this.movieRepository.createMovie(movieDto, genres, user);
        await this.movieRepository.save(movie);
        delete movie.postAuthor.id;
        return movie;
    }
    async update(movieDto, id, username) {
        const movie = await this.movieRepository.findById(id);
        const authorUsername = await this.movieRepository.getMovieAuthorById(id);
        if (authorUsername != username)
            throw new common_1.ForbiddenException();
        if (!movie)
            throw new common_1.NotFoundException();
        movieDto.genres = movieDto.genres.filter(genre => (0, uuid_1.validate)(genre));
        const genres = await this.genreService.findAllById(movieDto.genres);
        const updatedMovie = this.movieRepository.updateMovie(movie, movieDto, genres);
        await this.movieRepository.save(updatedMovie);
        return movie;
    }
    async delete(id, username) {
        const movie = await this.movieRepository.findById(id);
        const authorUsername = await this.movieRepository.getMovieAuthorById(id);
        if (authorUsername != username)
            throw new common_1.ForbiddenException();
        if (!movie)
            throw new common_1.NotFoundException();
        await this.movieRepository.delete({ id });
        const message = new message_dto_1.MessageDto('Deleted successfully');
        return message;
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [movie_repository_1.MovieRepository,
        genre_service_1.GenreService,
        user_service_1.UserService,
        redis_service_1.RedisService])
], MovieService);
//# sourceMappingURL=movie.service.js.map