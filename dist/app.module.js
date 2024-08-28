"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = require("./movie/movie.entity");
const genre_entity_1 = require("./genre/genre.entity");
const movie_module_1 = require("./movie/movie.module");
const genre_module_1 = require("./genre/genre.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/user.entity");
const jwt_1 = require("@nestjs/jwt");
const redis_module_1 = require("./redis/redis.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DB_URI,
                entities: [movie_entity_1.Movie, genre_entity_1.Genre, user_entity_1.User],
                synchronize: true,
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.SECRET,
                signOptions: { expiresIn: "15min" }
            }),
            movie_module_1.MovieModule,
            genre_module_1.GenreModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            redis_module_1.RedisModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map