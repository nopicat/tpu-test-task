import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'TODO_CLIENT',
                transport: Transport.REDIS,
                options: {
                    host: 'redis',
                    port: 6379,
                },
            },
        ]),
        AuthModule,
    ],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule {}
