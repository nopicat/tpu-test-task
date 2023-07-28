import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcExceptionFilter } from './common/filters/rpc-exception.filter';
import { AppExceptionFilter } from './common/filters/app-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new RpcExceptionFilter());
    app.useGlobalFilters(new AppExceptionFilter());

    await app.listen(3050);
}

bootstrap();
