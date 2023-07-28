import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import {
    CreateTokenData,
    CreateUserData,
    ValidateUserData,
} from './auth.interfaces';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern('validate_user')
    public validateUser(data: ValidateUserData) {
        return this.authService.validateUser(data.id, data.password);
    }

    @MessagePattern('create_user')
    public createUser(data: CreateUserData) {
        return this.authService.createUser(data.password);
    }

    @MessagePattern('create_token')
    public createToken(data: CreateTokenData) {
        return this.authService.createToken(data.id);
    }
}
