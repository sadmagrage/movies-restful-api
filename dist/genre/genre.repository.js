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
exports.GenreRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const genre_entity_1 = require("./genre.entity");
let GenreRepository = class GenreRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(genre_entity_1.Genre, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findAllAndJoinMovie() {
        const genres = await this.createQueryBuilder('genre')
            .select(['genre', 'movie.id', 'movie.name', 'movie.image'])
            .leftJoin('genre.movies', 'movie')
            .getMany();
        return genres;
    }
    async findAllById(id) {
        const genres = this.find({ where: { id: (0, typeorm_1.In)(id) } });
        return genres;
    }
    async findById(id) {
        const genre = this.findOneBy({ id });
        return genre;
    }
    async findByIdAndJoinMovie(id) {
        const genre = await this.createQueryBuilder('genre')
            .select(['genre', 'movie.id', 'movie.name'])
            .leftJoin('genre.movies', 'movie')
            .where("genre.id = :id", { id })
            .getOne();
        return genre;
    }
};
exports.GenreRepository = GenreRepository;
exports.GenreRepository = GenreRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], GenreRepository);
//# sourceMappingURL=genre.repository.js.map