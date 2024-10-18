import { InputType, Field, ID } from '@nestjs/graphql';
import { TaskStatus, TaskPriority } from '../../schemas/task.schema';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed'])
  status?: TaskStatus;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: TaskPriority;

  @Field({ nullable: true })
  @IsOptional()
  assignedTo?: string; // User ID
}