import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { TaskTag } from "./enum/task-tag.enum";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";

const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    isCompleted: false,
    priority: 1,
    tags: [TaskTag.WORK],
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    isCompleted: true,
    priority: 2,
    tags: [TaskTag.WORK],
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    isCompleted: false,
    priority: 3,
    tags: [TaskTag.WORK],
  },
];

const task = tasks[0];

const prismaMock = {
  task: {
    findMany: jest.fn().mockResolvedValue(tasks),
    findUnique: jest.fn().mockResolvedValue(task),
    create: jest.fn().mockResolvedValue(task),
  },
};

describe("Task Service", () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return an array of tasks", async () => {
    const result = await service.findAll();

    expect(result).toEqual(tasks);
    expect(prismaMock.task.findMany).toHaveBeenCalled();
  });

  it("should return one task", async () => {
    const result = await service.findById("1");

    expect(result).toEqual(task);
    expect(prismaMock.task.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should create task", async () => {
    const dto: CreateTaskDto = {
      title: "Task 4",
      description: "Description 4",
      isCompleted: false,
      priority: 4,
      tags: [TaskTag.WORK],
    };

    const result = await service.create(dto);

    expect(result).toEqual(task);
    expect(prismaMock.task.create).toHaveBeenCalledWith({
      data: dto,
    });
  });
});