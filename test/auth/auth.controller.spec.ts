import { INestApplication } from "@nestjs/common";
import { AuthService } from "../../src/auth/auth.service";
import { Test } from "@nestjs/testing";
import { AuthController } from "../../src/auth/auth.controller";
import { AuthDto } from "../../src/auth/auth.dto";
import { TokenDto } from "src/token/token.dto";
import * as request from "supertest";
import { User } from "src/user/user.entity";
import { Movie } from "src/movie/movie.entity";
import { randomUUID } from "crypto";

describe('AuthController', () => {

    let app: INestApplication;
    let authService: AuthService;

    beforeEach(() => jest.resetAllMocks());

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn()
                    }
                }
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);

        app = module.createNestApplication();

        await app.init();
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
        it('/POST auth/login', async () => {
            const { authDto, tokenDto } = createMock();

            jest.spyOn(authService, "login").mockResolvedValue(tokenDto);

            const result = await request(app.getHttpServer())
                .post("/auth/login")
                .accept("application/json")
                .send(authDto);

            expect(authService.login).toHaveBeenCalledWith(authDto);
            expect(result.status).toBe(200);
            expect(result.body).toEqual(tokenDto);
        });
    });
});