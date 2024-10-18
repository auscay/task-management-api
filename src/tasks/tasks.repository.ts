import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const createdTask = new this.taskModel(createTaskInput);
    return createdTask.save();
  }

  async findAll(filter: any, page: number, limit: number): Promise<{ tasks: Task[]; total: number }> {
    const tasks = await this.taskModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('assignedTo')
      .exec();

    const total = await this.taskModel.countDocuments(filter).exec();

    return { tasks, total };
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).populate('assignedTo').exec();
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskInput, { new: true })
      .populate('assignedTo')
      .exec();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}