import { Test, TestingModule } from '@nestjs/testing';
import { create } from 'domain';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const mockEntity = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('TodoController', () => {
  let controller: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockEntity,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  afterEach(() => {
    jest.clearAllMocks;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all todos', async () => {
    const todos = [
      {
        id: 1,
        title: 'work 1',
        description: 'do something 1',
        done: false,
        toDoAt: new Date('2024-04-19T17:00:00.000Z'),
      },
      {
        id: 2,
        title: 'work 2',
        description: 'do some thing 2',
        done: true,
        toDoAt: new Date('2024-04-19T17:00:00.000Z'),
      },
    ];
    mockEntity.findAll.mockResolvedValue(todos);
    const result = await todoService.findAll();
    expect(todoService.findAll).toHaveBeenCalled();
    expect(result).toStrictEqual(todos);
  });

  it('should create a new todo', async () => {
    const todoInfo = {
      id: 1,
      title: 'work 1',
      description: 'do something 1',
      toDoAt: new Date('2024-04-19T17:00:00.000Z'),
      done: false,
    };
    const mockTodo = {
      id: 1,
      title: 'work 1',
      description: 'do something 1',
      toDoAt: new Date('2024-04-19T17:00:00.000Z'),
      done: false,
    };
    const expectedResult = {
      id: 1,
      title: 'work 1',
      description: 'do something 1',
      toDoAt: new Date('2024-04-19T17:00:00.000Z'),
      done: false,
    };
    mockEntity.create.mockResolvedValue(mockTodo);
    const resultTestCreateTodo = await todoService.create(mockTodo);
    expect(resultTestCreateTodo).toStrictEqual(expectedResult);
    expect(todoService.create).toHaveBeenCalledWith(todoInfo);
  });

  it('should find a todo by ID', async () => {
    const mockTodo = {
      id: 1,
      title: 'work 1',
      description: 'do something 1',
      toDoAt: new Date('2024-04-19T17:00:00.000Z'),
      done: false,
    };
    mockEntity.findOne.mockResolvedValue(mockTodo);
    const foundTodo = await todoService.findOne(1);

    expect(todoService.findOne).toHaveBeenCalledWith(1);
    expect(foundTodo).toStrictEqual(mockTodo);
  });

  it('should delete a todo by ID', async () => {
    const mockTodo = {
      id: 1,
      title: 'work 1',
      description: 'do something 1',
      toDoAt: new Date('2024-04-19T17:00:00.000Z'),
      done: false,
    };
    mockEntity.delete.mockResolvedValue(mockTodo);
    const foundTodo = await todoService.delete(1);

    expect(todoService.delete).toHaveBeenCalledWith(1);
    expect(foundTodo).toStrictEqual(mockTodo);
  });
});
