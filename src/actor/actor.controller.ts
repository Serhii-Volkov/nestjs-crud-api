import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post('create')
  async create(@Body() dto: CreateActorDto) {
    return await this.actorService.create(dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.actorService.delete(id);
  }
}
