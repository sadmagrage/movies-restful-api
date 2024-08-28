import { UserService } from "src/user/user.service";
import { AuthService } from "../../src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { AuthDto } from "../../src/auth/auth.dto";
import { TokenDto } from "src/token/token.dto";
import { User } from "src/user/user.entity";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { Movie } from "src/movie/movie.entity";

describe("AuthService", () => {

    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        getCredentialsByUsername: jest.fn()
                    }
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn()
                    }
                }
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
    });

    const createMock = () => {
        const user = new User();
        const movie = new Movie();

        user.id = randomUUID();
        user.username = "user_username";
        user.password = "user_password";
        user.postedMovies = [movie];

        const authDto = new AuthDto();

        authDto.username = "auth_dto_username";
        authDto.password = "auth_dto_password";

        const token = "token";

        const tokenDto = new TokenDto(token);

        return { authDto, user, token, tokenDto };
    };

    describe('login', () => {
        it('Should authenticate and return a token', async () => {
            const { authDto, user, token, tokenDto } = createMock();
            
            user.password = await bcrypt.hash(authDto.password, 12);

            jest.spyOn(userService, "getCredentialsByUsername").mockResolvedValue(user);
            jest.spyOn(jwtService, "sign").mockReturnValue(token);

            const result = await authService.login(authDto);

            expect(result).not.toBeNull();
            expect(userService.getCredentialsByUsername).toHaveBeenCalledWith(authDto.username);
            expect(jwtService.sign).toHaveBeenCalledWith({ username: user.username });
            expect(result).toEqual(tokenDto);
        });
    });
});