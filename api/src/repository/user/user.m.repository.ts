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

  async searchByOptions(queries: { key: string; value: unknown }[]): Promise<User[]> {
    const queryObj: { [key: string]: unknown } = {};
    queries.forEach((query) => {
      queryObj[query.key] = query.value;
    });

    const result = await UserModel.find(queryObj);
    return result;
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

  async delete(id: string): Promise<User> {
    const result = await UserModel.findOneAndDelete({ id });
    if (result === null) throw new Error('Not found');

    return result;
  }
}
