//id Int @id @default(autoincrement())
//
//  title String 
//  description String?
//  releaseYear Int @map("release_year")
//
//  rating Float @default(0.0)
//  isAvailable Boolean @default(false) @map("is_available")
//
//  genre Genre @default(ACTION)
//
//  poster MoviePoster? @relation(fields: [posterId],references: [id],onDelete: Cascade)
//  posterId Int? @unique @map("poster_id")
//
//  reviews Review[] @relation("movie_reviews")
//  actors Actor[] @relation("movie_actors")
import { IsString, IsNotEmpty, IsOptional, IsInt, IsNumber, IsBoolean, IsEnum, Min, Max, IsArray, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

// Предположим, у вас есть enum Genre, экспортированный из Prisma или созданный вручную
export enum Genre {
  ACTION = 'ACTION',
  COMEDY = 'COMEDY',
  DRAMA = 'DRAMA',
  // добавьте остальные жанры...
}

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1800) // Валидация на адекватный год выпуска
  @Type(() => Number)
  releaseYear!: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  @Type(() => Number)
  rating?: number; // Опционально, так как в БД есть @default(0.0)

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean; // Опционально, так как в БД есть @default(false)

  @IsEnum(Genre)
  @IsOptional()
  genre?: Genre; // Опционально, так как в БД есть @default(ACTION)

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true }) // Проверяет, что каждый элемент массива — число
  @Type(() => Number)
  actorIds!: number[];

  @IsOptional()
  imageUrl?: string; // Поле для загрузки изображения, не сохраняется в БД напрямую
}