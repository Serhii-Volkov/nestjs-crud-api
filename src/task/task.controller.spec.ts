import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {v4 as uuidv4} from 'uuid'
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskTag } from './enum/task-tag.enum';

const tasks = [
    {id: uuidv4(), title: 'Task 1', description: 'Description 1', isCompleted: false, priority: 1, tags: [TaskTag.WORK]},
    {id: uuidv4(), title: 'Task 2', description: 'Description 2', isCompleted: true, priority: 2, tags: [TaskTag.WORK]},  
    {id: uuidv4(), title: 'Task 3', description: 'Description 3', isCompleted: false, priority: 3, tags: [TaskTag.WORK]}
]

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([tasks]),
            findById: jest.fn().mockResolvedValue(tasks),
            create: jest.fn().mockResolvedValue(tasks)
          },
        },
      ],
    }).compile();

    controller = module.get(TaskController)
    service = module.get(TaskService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return an array of tasks', async() => {
    const result = await controller.findAll()

    expect(result).toEqual([tasks])
  })

   it('should return an array of tasks', async() => {
    const result = await controller.findById('1')

    expect(result).toEqual([tasks])
  })

  it('should throw an exception if tasks not found', async() => {
    jest.
        spyOn(service, 'findById')
        .mockRejectedValueOnce(new NotFoundException('Task not found'))
    try{
        await controller.findById('123456')
    } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException)
        expect((e as Error).message).toBeInstanceOf('Tasks not found exeption')
    }
  })

  it('should create a new tasks', async() => {
    const dto: CreateTaskDto = {
        title: 'Task 4',
        description: 'Description 4',
        isCompleted: false,
        priority: 4,
        tags: [TaskTag.WORK],
    }
    const result = await controller.create(dto)

    expect(result).toEqual(tasks)
  })
});