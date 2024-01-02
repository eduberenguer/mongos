import { Schema, model } from 'mongoose';
import { User } from '../../entities/user';

const userSchema = new Schema<User>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  address: { type: String, required: true },
  favourites: { type: [String], required: true },
  registerDate: { type: Date, required: true },
  friends: { type: [String], required: true },
  lifestyle: { type: [String], required: true },
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const UserModel = model('User', userSchema, 'users');
