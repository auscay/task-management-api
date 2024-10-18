import { Schema, Document } from 'mongoose';

interface User extends Document {
  username: string;
  password: string;
  email: string;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

export { User, UserSchema };