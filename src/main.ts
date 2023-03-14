import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlwares/logger.middlware';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 7000;

  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');
  app.use(logger);
  // app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.listen(PORT, () =>
    console.log(`Стартанул наш стартап на порту ${PORT}, идем к успеху!`),
  );
}
bootstrap();
