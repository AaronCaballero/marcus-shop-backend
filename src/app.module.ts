import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from 'libs/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), PostgresModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
