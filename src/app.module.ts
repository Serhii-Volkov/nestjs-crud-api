import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { HttpModule } from './http/http.module';


@Module({
  imports: [TaskModule, MovieModule, UserModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
