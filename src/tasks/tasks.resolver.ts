import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  // Create a new task
  @Mutation(() => Task)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  // Get all tasks
  @Query(() => [Task], { name: 'tasks' })
  async findAll(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('status', { type: () => String, nullable: true }) status?: string,
    @Args('priority', { type: () => String, nullable: true }) priority?: string,
  ) {
    const result = await this.tasksService.findAll(page, limit, status, priority);
    return result.tasks;
  }

  // Get a single task by ID
  @Query(() => Task, { name: 'task' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.tasksService.findOne(id);
  }

  // Update a task by ID
  @Mutation(() => Task)
  async updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  // Delete a task by ID
  @Mutation(() => Task)
  async removeTask(@Args('id', { type: () => String }) id: string) {
    return this.tasksService.remove(id);
  }
}

