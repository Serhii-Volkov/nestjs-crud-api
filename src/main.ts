import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет из запроса все поля, которых нет в DTO (защита от лишних/вредных данных)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
