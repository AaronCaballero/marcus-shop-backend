import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from 'libs/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), PostgresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
