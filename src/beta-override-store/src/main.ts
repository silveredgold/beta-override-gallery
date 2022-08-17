import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import * as cookieParser from 'cookie-parser';
import process from 'node:process';

process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
});

process.on('SIGTERM', () => {
  console.info("Terminated")
  process.exit(0)
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {abortOnError: false});
  app.setGlobalPrefix('/api/');
  app.enableCors();
  app.use(cookieParser.default());
  await app.listen(3000);
}
bootstrap();
