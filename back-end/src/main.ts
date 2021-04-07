import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//TODO: Think about tables and docker re-configure
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
