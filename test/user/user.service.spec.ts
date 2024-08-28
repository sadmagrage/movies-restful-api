import { Test } from "@nestjs/testing";
import { UserRepository } from "../../src/user/user.repository";
import { UserService } from "../../src/user/user.service";
import { User } from "../../src/user/user.entity";
import { UserDto } from "../../src/user/user.dto";
import { MessageDto } from "src/message/message.dto";
import { randomUUID } from "crypto";
import { Movie } from "src/movie/movie.entity";
import { Genre } from "src/genre/genre.entity";

describe('UserService', () => {

    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: {
                        getCredentialsByUsername: jest.fn(),
                        findUserByUsername: jest.fn(),
                        userExists: jest.fn(),
                        createUser: jest.fn(),
                        save: jest.fn()
                    }
                }
            ]
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);

        jest.resetAllMocks();
    });

    const createMock = () => {
        const user = new User();
        const movie = new Movie();
        const genre = new Genre();

        user.id = randomUUID();
        user.username = 'username';
        user.password = 'password';
        user.postedMovies = [movie];

        movie.id = randomUUID();
        movie.duration = "2300";
        movie.genres = [genre];

        genre.id = randomUUID();
        genre.name = "genre_name";

        delete genre.movies;

        return { user, movie, genre };
    };

    describe('getCredentialsByUsername', () => {
        it('Should return user credentials acording to username', async () => {
            const username = 'username';

            const { user } = createMock();

            jest.spyOn(userRepository, 'getCredentialsByUsername').mockResolvedValue(user);

            const result = await userService.getCredentialsByUsername(username);
            
            expect(result).not.toBeNull();
            expect(userRepository.getCredentialsByUsername).toHaveBeenCalledWith(username);
            expect(result).toEqual(user);
        });
    });

    describe('findUserByUsername', () => {
        it('Should return an instance of user according to the username, without the password property', async () => {
            const username = 'username';

            const { user } = createMock();
    
            jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValue(user);
    
            const result = await userService.findUserByUsername(username);

            expect(result).not.toBeNull();
            expect(userRepository.findUserByUsername).toHaveBeenCalledWith(username);
            expect(result).toEqual(user);
        });
    });

    describe('saveUser', () => {
        it('Should save a new instance of User', async () => {
            const { user } = createMock();

            const userDto = new UserDto();

            userDto.username = "user_dto_username";
            userDto.password = "user_dto_password";

            const message = new MessageDto("User created successfully");

            jest.spyOn(userRepository, "userExists").mockResolvedValue(false);
            jest.spyOn(userRepository, "createUser").mockResolvedValue(user);
            
            const result = await userService.saveUser(userDto);

            expect(result).not.toBeNull();
            expect(userRepository.userExists).toHaveBeenCalledWith(userDto.username);
            expect(userRepository.createUser).toHaveBeenCalledWith(userDto);
            expect(result).toEqual(message);
        });
    });
});