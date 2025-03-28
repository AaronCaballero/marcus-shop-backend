import { NestFactory } from '@nestjs/core';
import { createOpenApi } from 'libs/open-api';
import { AppModule } from './app.module';
import { ValidationPipe } from '../libs/class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  createOpenApi(app);

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
