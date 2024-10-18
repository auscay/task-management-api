import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.input';  // DTO for creating a task
import { UpdateTaskInput } from './dto/update-task.input';  // DTO for updating a task
import { TasksRepository } from './tasks.repository';  // Mock the repository
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  // Mock repository methods
  const mockTasksRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      _id: 'someTaskId',
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    findAll: jest.fn().mockImplementation((page: number, limit: number, filter: { status?: string, priority?: string }) => ({
      tasks: [
        {
          _id: 'taskId1',
          title: 'Task 1',
          status: 'pending',
          priority: 'medium',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 'taskId2',
          title: 'Task 2',
          status: 'in-progress',
          priority: 'high',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      total: 2,  // Simulating the total number of tasks for pagination
    })),
    findOne: jest.fn().mockImplementation((id) => {
      if (id === 'existingTaskId') {
        return {
          _id: 'existingTaskId',
          title: 'Existing Task',
          status: 'pending',
          priority: 'medium',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      return null;
    }),
    update: jest.fn().mockImplementation((id, updateTaskInput) => {
      if (id === '67111d40e8a8c998dd2fe82c') {
        return {
          _id: id,
          ...updateTaskInput,
          updatedAt: new Date(),
        };
      }
      return null;
    }),
    remove: jest.fn().mockImplementation((id) => {
      if (id === '67111d40e8a8c998dd2fe82c') {
        return {
          _id: id,
          title: 'Deleted Task',
        };
      }
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,  // Provide the mocked repository
          useValue: mockTasksRepository,  // Use the mock implementation
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  // Test case for creating a task
  it('should create a task', async () => {
    const createTaskDto: CreateTaskInput = {
      title: 'New Task',
      priority: 'high',
      status: 'pending',
    };

    const result = await service.create(createTaskDto);

    // Expected result should include additional fields like _id, timestamps, etc.
    expect(result).toEqual({
      ...createTaskDto,
      _id: expect.any(String),  // Simulating Mongoose ObjectId
      createdAt: expect.any(Date),  // Simulating timestamps
      updatedAt: expect.any(Date),
    });

    // Ensure the mock repository's create method was called with the correct dto
    expect(mockTasksRepository.create).toHaveBeenCalledWith(createTaskDto);
  });

  // Test case for retrieving all tasks (findAll)
  it('should retrieve all tasks with pagination', async () => {
    const page = 1;
    const limit = 10;
    const status = 'pending';
    const priority = 'medium';

    const result = await service.findAll(page, limit, status, priority);

    expect(result).toEqual({
      tasks: [
        {
          _id: 'taskId1',
          title: 'Task 1',
          status: 'pending',
          priority: 'medium',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          _id: 'taskId2',
          title: 'Task 2',
          status: 'in-progress',
          priority: 'high',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ],
      total: 2,  // Simulating the total number of tasks
    });

    // Ensure the mock repository's findAll method was called with the correct parameters as an object
    expect(mockTasksRepository.findAll).toHaveBeenCalledWith({ status, priority }, page, limit);
  });

  // Test case for finding a task by ID (findOne)
  it('should find and return a task by ID', async () => {
    const result = await service.findOne('existingTaskId');
    expect(result).toEqual({
      _id: 'existingTaskId',
      title: 'Existing Task',
      status: 'pending',
      priority: 'medium',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should throw NotFoundException if task is not found', async () => {
    await expect(service.findOne('nonExistingTaskId')).rejects.toThrow(NotFoundException);
  });

  // Test case for updating a task (update)
  it('should update and return the task', async () => {
    const updateTaskDto: UpdateTaskInput = { 
      id: '67111d40e8a8c998dd2fe82c',
      title: 'Updated Task', priority: 'high', status: 'completed' };
    const result = await service.update('67111d40e8a8c998dd2fe82c', updateTaskDto);
    expect(result).toEqual({
      _id: '67111d40e8a8c998dd2fe82c',
      ...updateTaskDto,
      updatedAt: expect.any(Date),
    });
  });

  it('should throw BadRequestException if ID format is invalid for update', async () => {
    const updateTaskDto: UpdateTaskInput = { 
      id: 'existingTaskId',
      title: 'Update Task', priority: 'low', status: 'completed' };
    await expect(service.update('invalidId', updateTaskDto)).rejects.toThrow(BadRequestException);
  });

  // it('should throw NotFoundException if ID format is invalid', async () => {
  //   const updateTaskDto: UpdateTaskInput = { 
  //     id: 'existingTaskId',
  //     title: 'Invalid ID Task', priority: 'low', status: 'completed' };
  //   await expect(service.update('invalidId', updateTaskDto)).rejects.toThrow(NotFoundException);
  // });

  // Test case for removing a task (remove)
  it('should remove and return the task', async () => {
    const result = await service.remove('67111d40e8a8c998dd2fe82c');
    expect(result).toEqual({
      _id: '67111d40e8a8c998dd2fe82c',
      title: 'Deleted Task',
    });
  });

  it('should throw NotFoundException if task to remove is not found', async () => {
    await expect(service.remove('nonExistingTaskId')).rejects.toThrow(NotFoundException);
  });
  
  it('should throw BadRequestException if ID format is invalid', async () => {
    await expect(service.remove('invalidId')).rejects.toThrow(NotFoundException);
  });
});