import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '../datasource/postgres.datasource';
import { SnakeCaseNamingStrategy } from '../strategy/snake-case-naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        entities: ['{dist/,}src/**/*.entity.js'],
        migrations: ['{dist/,}src/migrations/*.js'],
        namingStrategy: new SnakeCaseNamingStrategy(),
        retryAttempts: 5,
        retryDelay: 3000,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    console.log('Running migrations...');
    try {
      const connection = await dataSource.initialize();
      const migrations = await connection.runMigrations();
      console.log(
        `Migrations executed successfully: ${JSON.stringify(
          migrations.map((migration) => migration.name),
        )}`,
      );
    } catch (error) {
      console.error('Error executing migrations:', error);
    }
  }
}
