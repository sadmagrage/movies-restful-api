import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Role } from "src/role/role.enum";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        
        let token = req.headers["authorization"]
        
        if (!token) throw new UnauthorizedException();

        token = token.replace('Bearer ', '');

        try {
            const payload = await this.jwtService.verifyAsync(token);

            const role = await this.userService.getRoleByUsername(payload["username"]);

            const roles = role == Role.Admin ? [ Role.Admin, Role.User ] : [ Role.User ];

            payload['roles'] = roles;

            req['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }

        return true;
    }
}