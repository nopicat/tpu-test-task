import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        TodoModule,
        {
            transport: Transport.REDIS,
            options: {
                host: 'redis',
                port: 6379,
            },
        },
    );

    await app.listen();
}

bootstrap();
