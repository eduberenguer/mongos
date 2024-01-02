import { User } from '../../entities/user';
import { Repository } from '../repository';
import { UserModel } from './user.m.model';

export class UserRepo implements Repository<User> {
  constructor() {}

  async create(data: Omit<User, 'id'>): Promise<User> {
    const userExist = await UserModel.findOne({ email: data.email });
    if (userExist) throw new Error('User already exists');
    const newUser = await UserModel.create(data);
    return newUser;
  }

  async queryAll(): Promise<User[]> {
    const allData = await UserModel.find({});
    return allData;
  }
}
