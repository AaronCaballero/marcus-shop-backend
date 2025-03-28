import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { PostgresModule } from 'libs/database';
import { ValidationPipe } from '../libs/class-validator';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), PostgresModule, ProductModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
