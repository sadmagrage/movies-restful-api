"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const genre_entity_1 = require("./genre.entity");
const genre_repository_1 = require("./genre.repository");
const genre_service_1 = require("./genre.service");
const genre_controller_1 = require("./genre.controller");
const user_module_1 = require("../user/user.module");
let GenreModule = class GenreModule {
};
exports.GenreModule = GenreModule;
exports.GenreModule = GenreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([genre_entity_1.Genre]),
            user_module_1.UserModule
        ],
        providers: [
            genre_repository_1.GenreRepository,
            genre_service_1.GenreService
        ],
        controllers: [genre_controller_1.GenreController],
        exports: [
            genre_repository_1.GenreRepository,
            genre_service_1.GenreService
        ]
    })
], GenreModule);
//# sourceMappingURL=genre.module.js.map