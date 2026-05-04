import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchUpdateTaskDto } from './dto/patch-update-task.dto';
import {PutUpdateTaskDto} from './dto/put-update-task.dto'

@Injectable()
export class TaskService {

    private tasks = [
          { id: 1, title: 'Task 1', description: 'Description of Task 1', isCompleted: true, priority: 1, tags: ['work', 'learn'] },
          { id: 2, title: 'Task 2', description: 'Description of Task 2', isCompleted: false, priority: 2, tags: ['personal'] },
        ]


    findAll() {
        return this.tasks
    }


    findById(id: number) {
        const task = this.tasks.find(task => task.id === id)
        if(!task) {
            throw new NotFoundException('Task not found')
        }
        return task
    }


    create(dto: CreateTaskDto) {
        const { title, description, isCompleted, priority, tags } = dto
        const newTask = {id: this.tasks.length + 1, title: title, description: description, isCompleted: isCompleted ?? false, priority: priority ?? 1, tags: tags ?? []}

         this.tasks.push(newTask)
         return this.tasks
    }


    patchUpdate(id: number, dto: PatchUpdateTaskDto) {
        const task = this.tasks.find(task => task.id === id);
        
        if (!task) {
            throw new NotFoundException('Task not found');
        }
    
        Object.assign(task, dto);
    
        return task;
    }


    putUpdate(id: number, dto: PutUpdateTaskDto) {
        const task = this.tasks.find(task => task.id === id)
        const {title, description, isCompleted,  priority, tags} = dto

        if(!task) {
            throw new NotFoundException('Task not found')
        }
        
        task.title = title
        task.description = description
        task.isCompleted = isCompleted ?? false
        task.priority = priority ?? 1
        task.tags = tags ?? []

        return task
    }

    delete(id: number) {
        const task = this.tasks.find(task => task.id === id)

        if(!task) {
            throw new NotFoundException('Task not found')       
        }

        this.tasks = this.tasks.filter(task => task.id !== id)

        return this.tasks
    }


}
