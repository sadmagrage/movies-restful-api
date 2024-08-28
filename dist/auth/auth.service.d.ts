import { UserService } from "src/user/user.service";
import { AuthDto } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";
import { TokenDto } from "src/token/token.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(authDto: AuthDto): Promise<TokenDto>;
}
