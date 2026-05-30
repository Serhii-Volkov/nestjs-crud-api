import { MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TaskModule } from './task/task.module';
import { MovieModule } from './movie/movie.module';
//import { UserModule } from './user/user.module';
import { HttpModule } from './http/http.module';
import { PrismaModule } from './prisma/prisma.module';
import { ActorModule } from './actor/actor.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    TaskModule,
    MovieModule,
    //UserModule,
    HttpModule,
    ActorModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*') // Работает на всех маршрутах
                                      //.apply(FirstMiddleware, SecondMiddleware, LoggerMiddleware) // Работает последовательно, сначала FirstMiddleware, потом SecondMiddleware, потом LoggerMiddleware
                                      //.exclude('api/movies', 'api/movies/:id') // На этих маршрутах не работает
                                      //.forRoutes(AppController) // Работает на всех маршрутах контроллера AppController
                                      //.forRoutes({ path: 'movies', method: RequestMethod.POST }) // Работает только на POST запросах к маршруту /movies
  }
}