import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserDto } from "./user.dto";
import * as bcrypt from "bcryptjs";
import { Role } from "src/role/role.enum";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async getCredentialsByUsername(username: string): Promise<User> {
        const user = this.findOne({ select: { username: true, password: true }, where: { username } });

        return user;
    }

    async findUserByUsername(username: string): Promise<User> {
        const user = this.findOne({ select: { username: true, id: true }, where: { username } });

        return user;
    }

    async userExists(username: string): Promise<Boolean> {
        const user = await this.findOne({ select: { username: true }, where: { username } });

        return user ? true : false;
    }

    async createUser(userDto: UserDto): Promise<User> {
        const user = new User();

        user.username = userDto.username;
        user.password = await bcrypt.hash(userDto.password, 12);
        user.postedMovies = [];
        user.role = Role.User;

        return user;
    }

    async getRoleByUsername(username: string): Promise<User> {
        const role = await this.findOne({
            select: {
                role: true
            },
            where: { 
                username
            }
        });

        return role;
    }
}