import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [
    forwardRef(() => MovieModule) // <-- Оберни импорт вот так
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
