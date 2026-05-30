import { Module, forwardRef } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
//import { UserModule } from '../user/user.module';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
  //imports: [
  //  forwardRef(() => UserModule)
  //]
})
export class MovieModule {}
