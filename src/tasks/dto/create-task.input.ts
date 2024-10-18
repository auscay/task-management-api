import { InputType, Field } from '@nestjs/graphql';
import { TaskStatus, TaskPriority } from '../../schemas/task.schema';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { defaultValue: 'pending' })
  @IsEnum(['pending', 'in-progress', 'completed'])
  status: TaskStatus;

  @Field(() => String, { defaultValue: 'medium' })
  @IsEnum(['low', 'medium', 'high'])
  priority: TaskPriority;

  @Field({ nullable: true })
  @IsOptional()
  assignedTo?: string; // User ID
}