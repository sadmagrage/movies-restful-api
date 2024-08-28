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
exports.GenreController = void 0;
const common_1 = require("@nestjs/common");
const genre_service_1 = require("./genre.service");
const genre_dto_1 = require("./genre.dto");
const httpException_filter_1 = require("../http-exception/httpException.filter");
const uuid_1 = require("uuid");
const swagger_1 = require("@nestjs/swagger");
const genre_entity_1 = require("./genre.entity");
const crypto_1 = require("crypto");
const auth_guard_1 = require("../auth/auth.guard");
const role_guard_1 = require("../role/role.guard");
const role_enum_1 = require("../role/role.enum");
const role_decorator_1 = require("../role/role.decorator");
let GenreController = class GenreController {
    constructor(genreService) {
        this.genreService = genreService;
    }
    async findAllAndJoinMovie(res) {
        const genres = await this.genreService.findAllAndJoinMovie();
        res.status(200).json(genres);
    }
    async findByIdAndJoinMovie(res, id) {
        if (!(0, uuid_1.validate)(id))
            throw new common_1.BadRequestException('Value is not an UUID');
        const genre = await this.genreService.findByIdAndJoinMovie(id);
        res.status(200).json(genre);
    }
    async save(res, genreDto) {
        const genre = await this.genreService.save(genreDto);
        res.status(201).json(genre);
    }
    async update(res, genreDto, id) {
        if (!(0, uuid_1.validate)(id))
            throw new common_1.BadRequestException('Value is not an UUID');
        const genre = await this.genreService.update(genreDto, id);
        res.status(200).json(genre);
    }
    async delete(res, id) {
        if (!(0, uuid_1.validate)(id))
            throw new common_1.BadRequestException('Value is not an UUID');
        const message = await this.genreService.delete(id);
        res.status(200).json(message);
    }
};
exports.GenreController = GenreController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Return the list of Genres',
        type: [genre_entity_1.Genre],
        status: 200
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: 'Unexpected error'
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "findAllAndJoinMovie", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Return a Genre according to the id',
        type: genre_entity_1.Genre
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
], GenreController.prototype, "findByIdAndJoinMovie", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Create an instance of Genre and return it',
        type: genre_entity_1.Genre
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: 'Unexpected error'
    }),
    (0, swagger_1.ApiBody)({
        type: genre_dto_1.GenreDto,
        required: true
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Require admin role' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, genre_dto_1.GenreDto]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOkResponse)({
        description: 'Update an instance of Genre according to the id and return it',
        type: genre_entity_1.Genre
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
    (0, swagger_1.ApiOperation)({ summary: 'Require admin role' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, genre_dto_1.GenreDto, String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOkResponse)({
        description: 'Delete an instance of Genre according to the id',
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
    (0, swagger_1.ApiOperation)({ summary: 'Require admin role' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "delete", null);
exports.GenreController = GenreController = __decorate([
    (0, swagger_1.ApiTags)('genre'),
    (0, common_1.Controller)('genre'),
    (0, common_1.UseFilters)(httpException_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [genre_service_1.GenreService])
], GenreController);
//# sourceMappingURL=genre.controller.js.map