import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarbonCertificateController } from './api/controllers/carbon-certificate-controller';
import { AppOptions, CONFIG } from './config';
import { CarbonCertificateServiceImpl } from './domain/services/carbon-certificates/carbon-certificates';
import { installDocumentation } from './framework/documentation';
import { useFastifyAdapter } from './framework/fastify-adapter';
import { factory } from './framework/provider';
import { CarbonCertificateEntityManager } from './infrastructure/persistence/repository/carbon-certificate';
import { UserEntityManager } from './infrastructure/persistence/repository/user';

@Module({
  imports: [
    ConfigModule.forRoot({ load: Object.values(CONFIG), isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: (options) => options, inject: [CONFIG.DB.KEY] }),
    TypeOrmModule.forFeature([CarbonCertificateEntityManager, UserEntityManager]),
  ],
  controllers: [CarbonCertificateController],
  providers: [factory(CarbonCertificateServiceImpl, [CarbonCertificateEntityManager, UserEntityManager])],
})
export class MainModule {
  static async run(): Promise<void> {
    const options = CONFIG.APP() as AppOptions;

    try {
      const app = await NestFactory.create<NestFastifyApplication>(MainModule, useFastifyAdapter(), {
        cors: false,
        bufferLogs: true,
      });

      app.enableCors({ origin: options.allowedOrigins || false });
      app.setGlobalPrefix(options.prefix);

      if (options.swaggerEnabled) {
        installDocumentation(app, options);
      }

      return await app.listen(options.port, '0.0.0.0');
    } catch (error: unknown) {
      process.exit(1);
    }
  }
}

MainModule.run();
