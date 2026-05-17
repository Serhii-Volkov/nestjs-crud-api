import { Controller, Get, Body, Post, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorators';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowercasePipe) // Пример использования pipe
  @Post()
  create(@Body('title') title: string) {
    return this.appService.create(title)
  }

  @UseGuards(AuthGuard) // Пример использования guard
  @UseInterceptors(ResponseInterceptor)
  @Get('/profile')
  getProfile(@UserAgent() userAgent: string) {
    return this.appService.getProfile(userAgent)
  }
}
