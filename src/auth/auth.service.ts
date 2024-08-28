import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthDto } from "./auth.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { TokenDto } from "src/token/token.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(authDto: AuthDto): Promise<TokenDto> {
        const user = await this.userService.getCredentialsByUsername(authDto.username);
        
        if (!user) throw new UnauthorizedException("Wrong credentials");

        const isEqual = await bcrypt.compare(authDto.password, user.password);

        if (!isEqual) throw new UnauthorizedException("Wrong credentials");

        const token = this.jwtService.sign({ username: user.username });

        const tokenDto = new TokenDto(token);

        return tokenDto;
    }
}