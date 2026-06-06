import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { ConfigModule } from '@nestjs/config';
//import { Module } from '@nestjs/common';
//import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './utils/swagger.utils';

const PORT = process.env.PORT 
console.log(PORT);


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет из запроса все поля, которых нет в DTO (защита от лишних/вредных данных)
    }),
  );

  //app.useGlobalFilters(new AllExceptionsFilter()) // Глобальный фильтр для обработки исключений
  //app.enableCors({
  //   origin: process.env.CLIENT_URL, // Разрешаем CORS только для указанного URL
  //   или origin: ['http://host1.com', 'http://host2.com'] для нескольких доменов
  //});

  app.setGlobalPrefix('api'); // Добавляем глобальный префикс для всех маршрутов (например, http://localhost:3000/api/movies)

  //const config = new DocumentBuilder()
  // .setTitle('Nest CRUD Api')
  // .setDescription('Bla bla bla')
  // .setVersion('1.0')
  // .setContact('Name', 'Link', 'Email')
  // .build() // Конфигурация для Swagger документации
//
  //const document = SwaggerModule.createDocument(app, config)
//
  //SwaggerModule.setup('api/docs', app, document) // Настройка маршрута для доступа к Swagger UI

  setupSwagger(app)
  await app.listen(process.env.PORT || 3005);
  console.log(`Server is running http://localhost:${process.env.PORT || 3005}`);
}
bootstrap()
  

 