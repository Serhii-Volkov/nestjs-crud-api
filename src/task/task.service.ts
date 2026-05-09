import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchUpdateTaskDto } from './dto/patch-update-task.dto';
import {PutUpdateTaskDto} from './dto/put-update-task.dto'
import {prisma} from '../../lib/prisma'

@Injectable()
export class TaskService {

   


    async findAll() {
        const tasks = await prisma.task.findMany()
        return tasks
    }

    async create() {
        await prisma.task.create({
  data: {
    title: 'task1',
    description: 'task1 description',
  },
});
    }


   //findById(id: string) {
   //    const task = this.tasks.find(task => task.id === id)
   //    if(!task) {
   //        throw new NotFoundException('Task not found')
   //    }
   //    return task
   //}


   //create(dto: CreateTaskDto) {
   //    const { title, description, isCompleted, priority, tags } = dto
   //    const newTask = {id: this.tasks.length + 1, title: title, description: description, isCompleted: isCompleted ?? false, priority: priority ?? 1, tags: tags ?? []}

   //     this.tasks.push(newTask)
   //     return this.tasks
   //}


   //patchUpdate(id: number, dto: PatchUpdateTaskDto) {
   //    const task = this.tasks.find(task => task.id === id);
   //    
   //    if (!task) {
   //        throw new NotFoundException('Task not found');
   //    }
   //
   //    Object.assign(task, dto);
   //
   //    return task;
   //}


   //putUpdate(id: number, dto: PutUpdateTaskDto) {
   //    const task = this.tasks.find(task => task.id === id)
   //    const {title, description, isCompleted,  priority, tags} = dto

   //    if(!task) {
   //        throw new NotFoundException('Task not found')
   //    }
   //    
   //    task.title = title
   //    task.description = description
   //    task.isCompleted = isCompleted ?? false
   //    task.priority = priority ?? 1
   //    task.tags = tags ?? []

   //    return task
   //}

   //delete(id: number) {
   //    const task = this.tasks.find(task => task.id === id)

   //    if(!task) {
   //        throw new NotFoundException('Task not found')       
   //    }

   //    this.tasks = this.tasks.filter(task => task.id !== id)

   //    return this.tasks
   //}


}
