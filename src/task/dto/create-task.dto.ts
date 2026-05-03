import { IsNotEmpty, IsString, MinLength, MaxLength, Length } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2, {message: 'Title must be at least 2 characters'})
    @MaxLength(300, {message: 'Title must be max 300 characters'})
        title!: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 3000, {message: 'Description must be between 2 and 3000 characters'})
        description!: string;
}