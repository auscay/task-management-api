import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TaskSchema } from '../schemas/task.schema';
import { UsersModule } from '../users/users.module'
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    UsersModule, // To resolve assignedTo references
  ],
  providers: [TasksService, TasksResolver, TasksRepository],
})
export class TasksModule {}
