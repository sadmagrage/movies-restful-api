import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppController {

    @Get()
    redirectToSwagger(@Res() res: Response) {
        res.redirect("https://sadmagrage.github.io/movies_restful_api_swagger/");
    }
}