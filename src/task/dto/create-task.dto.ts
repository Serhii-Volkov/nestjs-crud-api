import { IsNotEmpty, IsString, MinLength, MaxLength, Length, IsNumber, IsPositive, IsOptional, IsInt, IsBoolean, IsArray, IsUUID, IsEnum } from "class-validator";
import { StartsWith } from "../../common/decorators/starts-with.decorator";
import { TaskTag } from "../enum/task-tag.enum";

//  title!: string
//  description!: string
//  isCompleted?: boolean
//  priority?: number
//  tags!: string[] Prisma вернет пустой массив, если не указать значение для tags, поэтому он не может быть опциональным
//  userId?: string
export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    @StartsWith('Task:', {message: 'Title must start with prefix "Task:"'})
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

    @IsInt()
    @IsPositive({message: 'Priority must be a positive number'})
    @IsOptional()
    
        priority?: number

    @IsOptional()
    @IsArray()
    @IsEnum(TaskTag, {each: true, message: 'Tags must be one of the following values: work, study, home'})
        tags: TaskTag[] = [];

    @IsNotEmpty()
    @IsInt()
    //@IsUUID('all', {message: 'userId must be a valid UUID'})
        userId!: number
}