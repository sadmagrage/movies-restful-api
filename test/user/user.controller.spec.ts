import { INestApplication } from "@nestjs/common";
import { UserService } from "../../src/user/user.service";
import { Test } from "@nestjs/testing";
import { UserController } from "../../src/user/user.controller";
import { UserDto } from "../../src/user/user.dto";
import * as request from "supertest";
import { MessageDto } from "src/message/message.dto";

describe('UserController', () => {

    let app: INestApplication;
    let userService: UserService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        saveUser: jest.fn()
                    }
                }
            ]
        }).compile();

        userService = module.get<UserService>(UserService);

        app = module.createNestApplication();
        await app.init();
    });

    beforeEach(() => {
        jest.resetAllMocks();
    })

    const createMock = () => {
        const userDto = new UserDto();

        userDto.username = "user_dto_username";
        userDto.password = "user_dto_password";

        return { userDto };
    };

    describe('register', () => {
        it('/POST user/register', async () => {
            const message = new MessageDto("User created successfully");

            const { userDto } = createMock();

            jest.spyOn(userService, "saveUser").mockResolvedValue(message);

            const result = await request(app.getHttpServer())
                .post("/user/register")
                .accept("application/json")
                .send(userDto);

            expect(userService.saveUser).toHaveBeenCalledWith(userDto);
            expect(result.status).toBe(201);
            expect(result.body).toEqual(message);
        });
    });
});