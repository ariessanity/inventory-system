import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express, { Request, Response } from 'express';
import path, { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  await app.listen(4000);
}
bootstrap();
