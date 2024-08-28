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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const role_enum_1 = require("../role/role.enum");
const user_service_1 = require("../user/user.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        let token = req.headers["authorization"];
        if (!token)
            throw new common_1.UnauthorizedException();
        token = token.replace('Bearer ', '');
        try {
            const payload = await this.jwtService.verifyAsync(token);
            const role = await this.userService.getRoleByUsername(payload["username"]);
            const roles = role == role_enum_1.Role.Admin ? [role_enum_1.Role.Admin, role_enum_1.Role.User] : [role_enum_1.Role.User];
            payload['roles'] = roles;
            req['user'] = payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map