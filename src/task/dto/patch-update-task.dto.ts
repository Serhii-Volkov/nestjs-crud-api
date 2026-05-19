import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class PatchUpdateTaskDto extends PartialType(CreateTaskDto) {} 
//Скопировал CreateTaskDto и сделал поля необязательными с помощью PartialType()


