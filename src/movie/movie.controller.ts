import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { MovieService } from './movie.service';


@Controller({
  path: 'movies',
  //host: process.env.CLIENT_URL, // Ограничиваем доступ к этому контроллеру только с указанного URL
  // или host: ['host1.com', 'host2.com'] для нескольких доменов
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

 @Get('all')
  async findAll() {
    return await this.movieService.findAll();
  }
}
