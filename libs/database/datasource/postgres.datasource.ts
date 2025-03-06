import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeCaseNamingStrategy } from '../strategy/snake-case-naming.strategy';

dotenv.config();
const configService = new ConfigService();

export const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  url: configService.get('DATABASE_URL'),
  entities: ['{dist/,}src/**/*.entity.js'],
  migrations: ['{dist/,}src/migrations/*.js'],
  namingStrategy: new SnakeCaseNamingStrategy(),
});
