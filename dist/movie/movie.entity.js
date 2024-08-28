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
exports.Movie = void 0;
const swagger_1 = require("@nestjs/swagger");
const crypto_1 = require("crypto");
const genre_entity_1 = require("../genre/genre.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let Movie = class Movie {
};
exports.Movie = Movie;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, swagger_1.ApiProperty)({ example: (0, crypto_1.randomUUID)() }),
    __metadata("design:type", String)
], Movie.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Up - Altas Aventuras" }),
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => genre_entity_1.Genre, genre => genre.movies, { onDelete: "CASCADE" }),
    (0, swagger_1.ApiProperty)({ example: [{ id: (0, crypto_1.randomUUID)(), name: "Horror" }] }),
    __metadata("design:type", Array)
], Movie.prototype, "genres", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/03/73/20176438.jpg" }),
    __metadata("design:type", String)
], Movie.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Carl Fredricksen (Edward Asner) é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. O terreno onde a casa fica localizada interessa a um empresário, que deseja construir no local um edifício. Após um incidente em que acerta um homem com sua bengala, Carl é considerado uma ameaça pública e forçado a ser internado em um asilo. Para evitar que isto aconteça, ele enche milhares de balões em sua casa, fazendo com que ela levante vôo. O objetivo de Carl é viajar para uma floresta na América do Sul, um local onde ele e Ellie sempre desejaram morar. Só que, após o início da aventura, ele descobre que seu pior pesadelo embarcou junto: Russell (Jordan Nagai), um menino de 8 anos." }),
    __metadata("design:type", String)
], Movie.prototype, "synopsis", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "5700" }),
    __metadata("design:type", String)
], Movie.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "2009-09-04" }),
    __metadata("design:type", String)
], Movie.prototype, "release", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", scale: 2 }),
    (0, swagger_1.ApiProperty)({ example: 4.6 }),
    __metadata("design:type", Number)
], Movie.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.postedMovies, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    (0, swagger_1.ApiProperty)({ example: { username: "JohnSummit" } }),
    __metadata("design:type", user_entity_1.User)
], Movie.prototype, "postAuthor", void 0);
exports.Movie = Movie = __decorate([
    (0, typeorm_1.Entity)()
], Movie);
//# sourceMappingURL=movie.entity.js.map