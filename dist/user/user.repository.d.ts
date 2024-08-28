import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserDto } from "./user.dto";
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    getCredentialsByUsername(username: string): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    userExists(username: string): Promise<Boolean>;
    createUser(userDto: UserDto): Promise<User>;
    getRoleByUsername(username: string): Promise<User>;
}
