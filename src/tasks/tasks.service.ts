import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { TasksRepository } from './tasks.repository';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from '../schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    return this.tasksRepository.create(createTaskInput);
  }

  async findAll(page: number, limit: number, status?: string, priority?: string): Promise<{ tasks: Task[]; total: number }> {
    const filter: any = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    return this.tasksRepository.findAll(filter, page, limit);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    // Check if the ID is a valid ObjectId
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const updatedTask = await this.tasksRepository.update(id, updateTaskInput);
    if (!updatedTask) throw new NotFoundException(`Task with ID ${id} not found`);
    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    // Check if the ID is a valid ObjectId
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const deletedTask = await this.tasksRepository.remove(id);
    if (!deletedTask) throw new NotFoundException(`Task with ID ${id} not found`);
    return deletedTask;
  }
}