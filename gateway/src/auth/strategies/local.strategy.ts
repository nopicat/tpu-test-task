import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_CLIENT')
        private readonly authClient: ClientProxy,
    ) {
        super({
            usernameField: 'id',
        });
    }

    async validate(id: string, password: string) {
        const user = await firstValueFrom(
            this.authClient.send('validate_user', { id, password }),
        );

        if (!user) {
            throw new UnauthorizedException('Bad id or password');
        }

        return { id: user._id };
    }
}
