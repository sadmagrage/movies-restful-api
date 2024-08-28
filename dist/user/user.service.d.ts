import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { UserDto } from "./user.dto";
import { MessageDto } from "src/message/message.dto";
import { Role } from "src/role/role.enum";
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getCredentialsByUsername(username: string): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    saveUser(userDto: UserDto): Promise<MessageDto>;
    getRoleByUsername(username: string): Promise<Role>;
}
