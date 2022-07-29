import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const CONFIG = {
  APP: registerAs<AppOptions>('app', () => {
    return {
      swaggerEnabled: process.env.ENV !== 'production',
      allowedOrigins: process.env.APP_ALLOWED_ORIGINS,
      port: Number(process.env.APP_PORT) || 4000,
      prefix: process.env.APP_PREFIX || 'api',
      version: process.env.APP_VERSION || 'unknown',
      devMode: process.env.ENV !== 'production',
      environment: process.env.ENV || 'development',
      name: process.env.APP_NAME || 'unknown',
      title: process.env.APP_TITLE || 'unknown',
      description: process.env.APP_DESCRIPTION || 'unknown',
    };
  }),

  DB: registerAs<TypeOrmModuleOptions>('database', () => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      namingStrategy: new SnakeNamingStrategy(),
      logging: process.env.ENV !== 'production',
      migrationsRun: false,
      synchronize: false,
      entities: [`${__dirname}/infrastructure/persistence/entity/*{.ts,.js}`],
      migrations: [`${__dirname}/infrastructure/persistence/migration/*{.ts,.js}`],
      cli: {
        entitiesDir: 'src/infrastructure/persistence/entity',
        migrationsDir: 'src/infrastructure/persistence/migration',
      },
    };
  }),
};

export interface AppOptions {
  readonly allowedOrigins?: string;

  readonly environment: string;

  readonly port: number;

  readonly prefix: string;

  readonly version: string;

  readonly name: string;

  readonly title: string;

  readonly description: string;

  readonly swaggerEnabled: boolean;

  readonly devMode: boolean;
}
