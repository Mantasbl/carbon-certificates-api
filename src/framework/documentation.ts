import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppOptions } from '../config';

export const installDocumentation = (app: NestFastifyApplication, options: AppOptions): void => {
  const documentBuilder = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setVersion(options.version)
    .addBearerAuth();

  const document = SwaggerModule.createDocument(app, documentBuilder.build());

  SwaggerModule.setup(options.prefix + '/docs', app, document);
};
