import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
console.log(process.env.DB_DATABASE);
console.log(process.env.POSTGRES_DB);
console.log(process.env.PG_DATABASE)
bootstrap();
