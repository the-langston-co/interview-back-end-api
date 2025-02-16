import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('main');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3005;
  logger.debug(`Starting server on http://localhost:${port}`)
  await app.listen(port);
}
bootstrap();
