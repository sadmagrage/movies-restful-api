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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const crypto_1 = require("crypto");
const movie_entity_1 = require("../movie/movie.entity");
const role_enum_1 = require("../role/role.enum");
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: (0, crypto_1.randomUUID)() }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    (0, swagger_1.ApiProperty)({ example: "JohnSummit" }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)({ example: "$2a$12$czsdBnlRlyyvaeqymJgzN.bE55XE1NPVuc9aeCY5oX64FhyQMptW6" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movie_entity_1.Movie, movie => movie.postAuthor, { onDelete: 'CASCADE' }),
    (0, swagger_1.ApiProperty)({ example: {
            "id": "0e1bf34e-d682-4837-8f6a-cc79771e8cd4",
            "name": "Up - Altas Aventuras",
            "genres": [
                {
                    "id": "9bd076b2-37e4-4a78-b46f-472c55de6528",
                    "name": "Horror"
                }
            ],
            "image": "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/03/73/20176438.jpg",
            "synopsis": "Carl Fredricksen (Edward Asner) é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. O terreno onde a casa fica localizada interessa a um empresário, que deseja construir no local um edifício. Após um incidente em que acerta um homem com sua bengala, Carl é considerado uma ameaça pública e forçado a ser internado em um asilo. Para evitar que isto aconteça, ele enche milhares de balões em sua casa, fazendo com que ela levante vôo. O objetivo de Carl é viajar para uma floresta na América do Sul, um local onde ele e Ellie sempre desejaram morar. Só que, após o início da aventura, ele descobre que seu pior pesadelo embarcou junto: Russell (Jordan Nagai), um menino de 8 anos.",
            "duration": "5700",
            "release": "2009-09-04",
            "rating": 4.6
        } }),
    __metadata("design:type", Array)
], User.prototype, "postedMovies", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: role_enum_1.Role.User }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map