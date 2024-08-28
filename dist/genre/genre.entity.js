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
exports.Genre = void 0;
const swagger_1 = require("@nestjs/swagger");
const crypto_1 = require("crypto");
const movie_entity_1 = require("../movie/movie.entity");
const typeorm_1 = require("typeorm");
let Genre = class Genre {
};
exports.Genre = Genre;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, swagger_1.ApiProperty)({ example: (0, crypto_1.randomUUID)() }),
    __metadata("design:type", String)
], Genre.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "Horror" }),
    __metadata("design:type", String)
], Genre.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => movie_entity_1.Movie, movie => movie.genres),
    (0, typeorm_1.JoinTable)(),
    (0, swagger_1.ApiProperty)({ example: [{ id: (0, crypto_1.randomUUID)(), name: "Up - Altas Aventuras", image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/03/73/20176438.jpg" }] }),
    __metadata("design:type", Array)
], Genre.prototype, "movies", void 0);
exports.Genre = Genre = __decorate([
    (0, typeorm_1.Entity)()
], Genre);
//# sourceMappingURL=genre.entity.js.map