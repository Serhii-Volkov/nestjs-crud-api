import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ConflictException } from '@nestjs/common';


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

  async create(dto: CreateMovieDto){
    const {title, description, releaseYear, rating, isAvailable, genre,  imageUrl, actorIds } = dto

    const actors = await this.prisma.actor.findMany({
        where: {
            id: {in: actorIds}
        }
    })

    if(!actors || !actors.length) {
        throw new NotFoundException('Actors not found with provided ID')
    }

    

    return await this.prisma.movie.create({
        data: {
            title,  
            description,
            releaseYear,
            rating,
            isAvailable,
            genre,
            poster: imageUrl ? {
                create: {
                    url: imageUrl
                }
            } : undefined,
            actors: actorIds ? {
                // actor — это уже число (ID), поэтому превращаем его в объект для Prisma
                connect: actorIds.map(id => ({ id }))
            } : undefined
            
        },
        include: {
            actors: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
  }

  async findById(id: number) {
    const movieId = Number(id)
    const movie = await this.prisma.movie.findUnique({
        where: { id: movieId },
        include: {
            actors: {
                select: {
                    id: true,
                    name: true
                }
            },
            poster: {
                select: {
                    url: true
                }
            },
            reviews: {
                select: {
                    id: true,
                    rating: true,
                    content: true,
                }
            }
        }
    })

    if(!movie) {
        throw new NotFoundException('Movie not found')
    }

    return movie
  }

  async update(id: number, dto: UpdateMovieDto) { // 1. Меняем тип DTO на UpdateMovieDto
    const movieId = Number(id);
    const { imageUrl, actorIds, ...movieData } = dto;

    // 2. Проверяем, существует ли фильм
    const existingMovie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      throw new NotFoundException('Movie not found');
    }

    // 3. ПРОВЕРКА УНИКАЛЬНОСТИ TITLE (если фронтенд пытается изменить название)
    if (movieData.title && movieData.title !== existingMovie.title) {
      const titleExists = await this.prisma.movie.findUnique({
        where: { title: movieData.title }
      });
      if (titleExists) {
        throw new ConflictException(`Movie with title "${movieData.title}" already exists`);
      }
    }

    // 4. ВАЛИДАЦИЯ АКТЕРОВ (только если массив передали в PATCH-запросе)
    if (actorIds) {
      // Так как это PATCH, массив может быть пустым (например, если решили удалить всех актеров),
      // но если в нем есть ID, проверяем их существование в БД
      if (actorIds.length > 0) {
        const foundActors = await this.prisma.actor.findMany({
          where: { id: { in: actorIds } },
          select: { id: true }
        });

        if (foundActors.length !== actorIds.length) {
          throw new NotFoundException('One or more provided Actor IDs do not exist');
        }
      }
    }

    // 5. ОБНОВЛЕНИЕ
    return await this.prisma.movie.update({
      where: { id: movieId },
      data: {
        ...movieData, // Сюда пойдут только те поля, которые фронтенд прислал для изменения

        // Если actorIds передан (даже пустой массив `[]`), Prisma обновит связи через set.
        // Если вообще не передан (undefined), связи останутся старыми.
        actors: actorIds ? {
          set: actorIds.map(id => ({ id }))
        } : undefined,

        // Если imageUrl пришел, обновляем/создаем постер. Если нет — постер не трогаем.
        poster: imageUrl ? {
          upsert: {
            create: { url: imageUrl },
            update: { url: imageUrl }
          }
        } : undefined
      },
      include: {
        actors: { select: { id: true, name: true } },
        poster: true
      }
    });
  }

  async delete(id: number) {
    const movieId = Number(id);
    const existingMovie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      throw new NotFoundException('Movie not found');
    }

    return await this.prisma.movie.delete({
      where: { id: movieId }
    });
  }
}
