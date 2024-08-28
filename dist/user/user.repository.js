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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcryptjs");
const role_enum_1 = require("../role/role.enum");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getCredentialsByUsername(username) {
        const user = this.findOne({ select: { username: true, password: true }, where: { username } });
        return user;
    }
    async findUserByUsername(username) {
        const user = this.findOne({ select: { username: true, id: true }, where: { username } });
        return user;
    }
    async userExists(username) {
        const user = await this.findOne({ select: { username: true }, where: { username } });
        return user ? true : false;
    }
    async createUser(userDto) {
        const user = new user_entity_1.User();
        user.username = userDto.username;
        user.password = await bcrypt.hash(userDto.password, 12);
        user.postedMovies = [];
        user.role = role_enum_1.Role.User;
        return user;
    }
    async getRoleByUsername(username) {
        const role = await this.findOne({
            select: {
                role: true
            },
            where: {
                username
            }
        });
        return role;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map