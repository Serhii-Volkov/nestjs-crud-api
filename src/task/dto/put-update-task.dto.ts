import { IsNotEmpty, IsString, MinLength, MaxLength, Length, IsNumber, IsPositive, IsOptional, IsBoolean, IsArray, IsEnum } from "class-validator";

export enum TaskTag {
    WORK = 'work',  
    STUDY = 'study',
    HOME = 'home'
}
export class PutUpdateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2, {message: 'Title must be at least 2 characters'})
    @MaxLength(300, {message: 'Title must be max 300 characters'})
        title!: string

    @IsString()
    @IsNotEmpty()
    @Length(2, 3000, {message: 'Description must be between 2 and 3000 characters'})
        description!: string

    @IsBoolean()
    @IsOptional()
        isCompleted?: boolean

    @IsNumber()
    @IsPositive({message: 'Priority must be a positive number'})
    @IsOptional()
        priority?: number

    @IsArray()
    @IsOptional()
    @IsEnum(TaskTag, {each: true, message: 'Tags must be one of the following values: work, study, home'})
        tags?: TaskTag[]
}