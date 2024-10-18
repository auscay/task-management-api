import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TaskStatus, TaskPriority } from '../../schemas/task.schema';
import { User } from '../../users/models/users.model';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => String)
  status: TaskStatus;

  @Field(() => String)
  priority: TaskPriority;

  @Field(() => User, { nullable: true })
  assignedTo?: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}