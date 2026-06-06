import { Controller, Get, Param, Post, Body, Patch, Put, Delete} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchUpdateTaskDto } from './dto/patch-update-task.dto';
import { PutUpdateTaskDto } from './dto/put-update-task.dto';



@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  findAll() {
    return this.taskService.findAll()
  }

  @Post() 
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto)
  }
  
  @Get('by-id/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(id)
  }
//
  //@Post('create')
  //create(@Body() dto: CreateTaskDto) {
  //  return this.taskService.create(dto)
  //}
  //
  //@Patch('patch-update/:id')
  //patchUpdate(@Param('id') id: string, @Body() dto: PatchUpdateTaskDto) {
  //  return this.taskService.patchUpdate(Number(id), dto)
  //}
//
  //@Put('put-update/:id')
  //putUpdate(@Param('id') id: string, @Body() dto: PutUpdateTaskDto) {
  //  return this.taskService.putUpdate(Number(id), dto)
  //}
//
  //@Delete('delete/:id')
  //delete(@Param('id') id: string) {
  //  return this.taskService.delete(Number(id))
  //}
}
