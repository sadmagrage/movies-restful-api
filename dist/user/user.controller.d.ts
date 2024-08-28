import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { Response } from "express";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register(res: Response, userDto: UserDto): Promise<void>;
}
