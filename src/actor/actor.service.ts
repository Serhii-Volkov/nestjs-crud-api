import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: { name: string }) {
    const { name } = dto;

    const actorAlreadyExists = await this.prisma.actor.findUnique({
      where: { name },
    });

    if (actorAlreadyExists) {
      
      throw new ConflictException('Actor with this name already exists');
    }

    return this.prisma.actor.create({ data: { name } });
  }

  async findAll() {
    
    return this.prisma.actor.findMany();
  }

  async delete(id: string) {
    
    return this.prisma.actor.delete({
      where: { id: Number(id) },
    });
  }
}