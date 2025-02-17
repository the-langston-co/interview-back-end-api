import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  const port = process.env.PORT ?? 3005;
  logger.debug(`Starting server on http://localhost:${port}`);
  await app.listen(port);
}

bootstrap().catch((e) => console.error(e, 'bootstrapping error'));

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Langston Code Exercise API')
    // .setDescription('The  API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  patchNestJsSwagger();
  const documentFactory = () => {
    const document = SwaggerModule.createDocument(app, config, {
      autoTagControllers: true,
    });

    Object.keys(document.paths).forEach((path) => {
      const methods = document.paths[path];
      if (path.startsWith('/auth')) return;

      Object.keys(methods).forEach((method) => {
        const item = methods[method] as OperationObject;
        if (item) {
          item.security = [{ 'access-token': [] }];
        }
      });
    });

    return document;
  };
  SwaggerModule.setup('docs', app, documentFactory);
}
