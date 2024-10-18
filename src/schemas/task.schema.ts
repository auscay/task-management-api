import { Schema, Document, Types } from 'mongoose';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: Types.ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}

export const TaskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);