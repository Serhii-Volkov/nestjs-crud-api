import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskTag } from './enum/task-tag.enum';

const tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    isCompleted: false,
    priority: 1,
    tags: [TaskTag.WORK],
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    isCompleted: true,
    priority: 2,
    tags: [TaskTag.WORK],
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Description 3',
    isCompleted: false,
    priority: 3,
    tags: [TaskTag.WORK],
  },
];

const task = tasks[0];

const serviceMock = {
  findAll: jest.fn().mockResolvedValue(tasks),
  findById: jest.fn().mockResolvedValue(task),
  create: jest.fn().mockResolvedValue(task),
};

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of tasks', async () => {
    const result = await controller.findAll();

    expect(result).toEqual(tasks);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one task', async () => {
    const result = await controller.findById('1');

    expect(result).toEqual(task);
    expect(service.findById).toHaveBeenCalledWith('1');
  });

it('should throw an exception if task not found', async () => {
  jest
    .spyOn(service, 'findById')
    .mockRejectedValue(new NotFoundException('Task not found'));

  await expect(
    controller.findById('123456'),
  ).rejects.toThrow('Task not found');
});

  it('should create a new task', async () => {
    const dto: CreateTaskDto = {
      title: 'Task 4',
      description: 'Description 4',
      isCompleted: false,
      priority: 4,
      tags: [TaskTag.WORK],
    };

    const result = await controller.create(dto);

    expect(result).toEqual(task);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});