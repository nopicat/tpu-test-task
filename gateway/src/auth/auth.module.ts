import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import * as process from 'process';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_CLIENT',
                transport: Transport.REDIS,
                options: {
                    host: 'redis',
                    port: 6379,
                },
            },
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_LIFETIME,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {}
