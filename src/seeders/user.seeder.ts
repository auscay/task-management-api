import * as mongoose from 'mongoose'
import { UserSchema } from '../schemas/user.schema'
const dotenv = require('dotenv')
dotenv.config()

const User = mongoose.model('User', UserSchema);

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);

    // Seed Users
    const users = [
        { username: 'johndoe', email: 'john@example.com', password: '123456' },
        { username: 'janesmith', email: 'jane@example.com', password: 'abcdef' },
    ];

    for (const user of users) {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await new User(user).save();
        }
    }

    console.log('Seeding completed');
    await mongoose.disconnect();
}

seed().catch(err => console.error(err));