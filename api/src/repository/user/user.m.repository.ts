import { User } from '../../entities/user';
import { Repository } from '../repository';
import { UserModel } from './user.m.model';

export class UserRepo implements Repository<User> {
  constructor() {}

  async create(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await UserModel.create(data);
    return newUser;
  }

  async search({ key, value }: { key: string; value: unknown }): Promise<User> {
    const result = await UserModel.find({ [key]: value });

    return result[0];
  }

  async queryAll(): Promise<User[]> {
    const allData = await UserModel.find({});
    return allData;
  }

  async queryById(id: string): Promise<User> {
    const result = await UserModel.findById(id);
    if (result === null) throw new Error('Not found');
    return result;
  }
}
