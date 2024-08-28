import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { UserDto } from "./user.dto";
import { MessageDto } from "src/message/message.dto";
import { Role } from "src/role/role.enum";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getCredentialsByUsername(username: string): Promise<User> {
        const user = this.userRepository.getCredentialsByUsername(username);
        
        return user;
    }

    async findUserByUsername(username: string): Promise<User> {
        const user = await this.userRepository.findUserByUsername(username);

        return user;
    }

    async saveUser(userDto: UserDto): Promise<MessageDto> {
        const userAlreadyExists = await this.userRepository.userExists(userDto.username);

        if (userAlreadyExists) throw new ConflictException('Username already exists');
        
        const user = await this.userRepository.createUser(userDto);

        await this.userRepository.save(user);

        return new MessageDto("User created successfully");
    }

    async getRoleByUsername(username: string): Promise<Role> {
        const { role } = await this.userRepository.getRoleByUsername(username);

        return role;
    }
}