import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './user.decorator';
import { IUser } from './user.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequiredPipe } from '../common/pipes/required.pipe';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    public signup(@Body('password', RequiredPipe) password: string) {
        return this.authService.signup(password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    public signin(@User() user: IUser) {
        return this.authService.createToken(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    public user(@User() user: IUser) {
        return {
            id: user.id,
        };
    }
}
