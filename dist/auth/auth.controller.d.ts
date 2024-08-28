import { AuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(res: Response, authDto: AuthDto): Promise<void>;
}
