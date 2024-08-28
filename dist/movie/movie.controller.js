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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const movie_dto_1 = require("./movie.dto");
const httpException_filter_1 = require("../http-exception/httpException.filter");
const uuid_1 = require("uuid");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const movie_entity_1 = require("./movie.entity");
const crypto_1 = require("crypto");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async findAllAndJoinGenre(res) {
        const movies = await this.movieService.findAllAndJoinGenreAndUser();
        res.status(200).json(movies);
    }
    async findByIdAndJoinGenre(res, id) {
        if (!(0, uuid_1.validate)(id))
            throw new common_1.BadRequestException('Value is not an UUID');
        const movie = await this.movieService.findByIdAndJoinGenreAndUser(id);
        res.status(200).json(movie);
    }
    async save(res, movieDto, req) {
        const { username } = req['user'];
        const movie = await this.movieService.save(movieDto, username);
        res.status(201).json(movie);
    }
    async update(res, movieDto, id, req) {
        const { username } = req['user'];
        if (!(0, uuid_1.validate)(id))
            throw new common_1.BadRequestException('Value is not an UUID');
        const movie = await this.movieService.update(movieDto, id, username);
        res.status(200).json(movie);
    }
    async delete(res, id, req) {
        const { username } = req['user'];
        if (!(0, uuid_1.validate)(id))
            throw new common_1.BadRequestException('Value is not an UUID');
        const message = await this.movieService.delete(id, username);
        res.status(200).json(message);
    }
};
exports.MovieController = MovieController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Return the list of Movies',
        type: [movie_entity_1.Movie],
        status: 200
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: 'Unexpected error'
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "findAllAndJoinGenre", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Return a Movie according to the id',
        type: movie_entity_1.Movie
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid UUID'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Not found'
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: 'Unexpected error'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: (0, crypto_1.randomUUID)()
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "findByIdAndJoinGenre", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Create an instance of Movie and return it',
        type: movie_entity_1.Movie
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized, invalid or missing token'
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: 'Unexpected error'
    }),
    (0, swagger_1.ApiBody)({
        type: movie_dto_1.MovieDto,
        required: true
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, movie_dto_1.MovieDto, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Update an instance of Movie according to the id and return it',
        type: movie_entity_1.Movie
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid UUID'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Not found'
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: 'Unexpected error'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: (0, crypto_1.randomUUID)()
    }),
    (0, swagger_1.ApiBody)({
        type: movie_dto_1.MovieDto,
        required: true
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, movie_dto_1.MovieDto, String, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Delete an instance of Movie according to the id',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid UUID'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Not found'
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: 'Unexpected error'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: (0, crypto_1.randomUUID)()
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "delete", null);
exports.MovieController = MovieController = __decorate([
    (0, swagger_1.ApiTags)('movie'),
    (0, common_1.Controller)('movie'),
    (0, common_1.UseFilters)(httpException_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
//# sourceMappingURL=movie.controller.js.map