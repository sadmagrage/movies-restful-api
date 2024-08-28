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
exports.GenreService = void 0;
const common_1 = require("@nestjs/common");
const genre_repository_1 = require("./genre.repository");
const message_dto_1 = require("../message/message.dto");
let GenreService = class GenreService {
    constructor(genreRepository) {
        this.genreRepository = genreRepository;
    }
    findAllAndJoinMovie() {
        const genres = this.genreRepository.findAllAndJoinMovie();
        return genres;
    }
    findAllById(id) {
        const genres = this.genreRepository.findAllById(id);
        return genres;
    }
    async findByIdAndJoinMovie(id) {
        const genre = await this.genreRepository.findByIdAndJoinMovie(id);
        if (!genre)
            throw new common_1.NotFoundException();
        return genre;
    }
    async save(genreDto) {
        const genre = this.genreRepository.create(genreDto);
        await this.genreRepository.save(genre);
        return genre;
    }
    async update(genreDto, id) {
        const genre = await this.genreRepository.findById(id);
        if (!genre)
            throw new common_1.NotFoundException();
        genre.name = genreDto.name;
        await this.genreRepository.save(genre);
        return genre;
    }
    async delete(id) {
        const genre = await this.genreRepository.findById(id);
        if (!genre)
            throw new common_1.NotFoundException();
        await this.genreRepository.delete({ id });
        const message = new message_dto_1.MessageDto('Deleted successfully');
        return message;
    }
};
exports.GenreService = GenreService;
exports.GenreService = GenreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genre_repository_1.GenreRepository])
], GenreService);
//# sourceMappingURL=genre.service.js.map