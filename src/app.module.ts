import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from 'libs/database';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), PostgresModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
