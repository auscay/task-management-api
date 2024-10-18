import * as mongoose from 'mongoose'
import { TaskSchema } from '../schemas/task.schema'
const dotenv = require('dotenv')
dotenv.config()

const Task = mongoose.model('Task', TaskSchema);

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);
    // Seed Tasks
    const tasks = [
        { title: 'Task 1', description: 'Description 1' },
        { title: 'Task 2', description: 'Description 2' },
    ];

    for (const task of tasks) {
        const existingTask = await Task.findOne({ title: task.title });
        if (!existingTask) {
            await new Task(task).save();
        }
    }

    console.log('Seeding completed');
    await mongoose.disconnect();
}
seed().catch(err => console.error(err));
    