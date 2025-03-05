import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeCaseNamingStrategy } from '../strategy/snake-case-naming.strategy';

dotenv.config();
const configService = new ConfigService();

export const dataSource = new DataSource({
  type: 'postgres',
  url: configService.get('POSTGRES_URI'),
  entities: ['{dist/,}src/**/*.entity.js'],
  migrations: ['{dist/,}src/migrations/*.js'],
  namingStrategy: new SnakeCaseNamingStrategy(),
});
