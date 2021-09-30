import {Body, Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import {Response, Request} from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("sign-up")
    singUpUser(@Body() dto: CreateUserDto) {
        return this.authService.singUpUser(dto);
    }

    @Post("sign-in")
    signIn(
        @Body() dto: SignInDto,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.signIn(dto, response);
    }
    @UseGuards(AuthGuard("auth"))
    @Get()
    isLogin(@Req() request: Request) {
        return this.authService.getUserData(request.user);
    }
    @Post("refresh")
    refreshToken(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.refreshToken(request, response);
    }
    @Post("logout")
    logout(@Res({ passthrough: true }) response: Response) {
        return this.authService.logout(response);
    }
}
