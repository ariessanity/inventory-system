import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import path, { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));

    app.use('*', (req, res) => {
      res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
    });
  }

  await app.listen(4000);
}
bootstrap();
