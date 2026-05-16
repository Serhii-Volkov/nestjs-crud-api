import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.movie.findMany({
        where: {
            isAvailable: true
        },
        orderBy: {
            createdAt: 'desc'   
        },
        select: {
            id: true,
            title: true,
            releaseYear: true,
            genre: true,
            actors: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
        //Нельзя одновременно использовать select и include. Либо то, либо то. 
        // Если нужно выбрать только определенные поля, то используем select. Если нужно выбрать все поля 
        // и добавить связанные сущности, то используем include.
        //include: {
        //    actors: {
        //        select: {
        //            id: true,
        //            name: true
        //        }
        //    }
        //}

    });
  }


}
