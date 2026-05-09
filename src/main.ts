import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {prisma} from '../lib/prisma'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет из запроса все поля, которых нет в DTO (защита от лишних/вредных данных)
    }),
  );

  //app.enableCors({
  //   origin: process.env.CLIENT_URL, // Разрешаем CORS только для указанного URL
  //   или origin: ['http://host1.com', 'http://host2.com'] для нескольких доменов
  //});

  app.setGlobalPrefix('api'); // Добавляем глобальный префикс для всех маршрутов (например, http://localhost:3000/api/movies)

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
