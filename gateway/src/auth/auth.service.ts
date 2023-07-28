import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_CLIENT')
        private readonly authClient: ClientProxy,
    ) {}

    public async signup(password: string) {
        const user = await firstValueFrom(
            this.authClient.send('create_user', { password }),
        );

        const token = await firstValueFrom(
            this.authClient.send('create_token', { id: user._id }),
        );

        return {
            id: user._id,
            token,
        };
    }

    public async createToken(id: string) {
        const token = await firstValueFrom(
            this.authClient.send('create_token', { id }),
        );

        return {
            token,
        };
    }
}
