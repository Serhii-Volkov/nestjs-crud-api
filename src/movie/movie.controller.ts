import { Controller, Get, Query, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';


@Controller({
  path: 'movies',
  //host: process.env.CLIENT_URL, // Ограничиваем доступ к этому контроллеру только с указанного URL
  // или host: ['host1.com', 'host2.com'] для нескольких доменов
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

 @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateMovieDto) {
    return await this.movieService.create(dto)
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return await this.movieService.findById(id);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateMovieDto) {
    return await this.movieService.update(id, dto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.movieService.delete(id);
  }

}
