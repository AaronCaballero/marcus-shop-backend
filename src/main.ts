import { NestFactory } from '@nestjs/core';
import { createOpenApi } from 'libs/open-api';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  createOpenApi(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
