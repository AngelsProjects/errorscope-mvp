import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3001);
  console.log('🚀 ErrorScope Backend running on http://localhost:3001');
}

bootstrap();
