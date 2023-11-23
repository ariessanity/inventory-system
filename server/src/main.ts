import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import path, { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.use('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../dist/index.html'));
      res.end();
    });
  }

  await app.listen(4000);
}
bootstrap();
