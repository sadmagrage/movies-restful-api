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
exports.MovieDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const crypto_1 = require("crypto");
const duration_dto_1 = require("../duration/duration.dto");
class MovieDto {
    isReleaseValid() {
        try {
            const release = this.release;
            const [year, month, day] = release.split("-");
            if (year == null || month == null || day == null)
                return false;
            if (year.split('').filter(char => /^[a-zA-Z]$/.test(char)).length != 0)
                return false;
            if (month.split('').filter(char => /^[a-zA-Z]$/.test(char)).length != 0)
                return false;
            if (day.split('').filter(char => /^[a-zA-Z]$/.test(char)).length != 0)
                return false;
            const date = new Date(release);
            return !isNaN(date.getTime());
        }
        catch (error) {
            return false;
        }
    }
}
exports.MovieDto = MovieDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Up - Altas Aventuras" }),
    __metadata("design:type", String)
], MovieDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [(0, crypto_1.randomUUID)()] }),
    __metadata("design:type", Array)
], MovieDto.prototype, "genres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/03/73/20176438.jpg" }),
    __metadata("design:type", String)
], MovieDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Carl Fredricksen (Edward Asner) é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. O terreno onde a casa fica localizada interessa a um empresário, que deseja construir no local um edifício. Após um incidente em que acerta um homem com sua bengala, Carl é considerado uma ameaça pública e forçado a ser internado em um asilo. Para evitar que isto aconteça, ele enche milhares de balões em sua casa, fazendo com que ela levante vôo. O objetivo de Carl é viajar para uma floresta na América do Sul, um local onde ele e Ellie sempre desejaram morar. Só que, após o início da aventura, ele descobre que seu pior pesadelo embarcou junto: Russell (Jordan Nagai), um menino de 8 anos." }),
    __metadata("design:type", String)
], MovieDto.prototype, "synopsis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { hours: 1, minutes: 35 } }),
    __metadata("design:type", duration_dto_1.DurationDto)
], MovieDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2009-09-04" }),
    __metadata("design:type", String)
], MovieDto.prototype, "release", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.6 }),
    __metadata("design:type", Number)
], MovieDto.prototype, "rating", void 0);
//# sourceMappingURL=movie.dto.js.map