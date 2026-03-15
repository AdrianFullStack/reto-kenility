import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Elimina propiedades que no estén en el DTO
    forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
    transform: true,            // Transforma los payloads a instancias de los DTOs
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
