import { Dog } from '../../entities/dog';
import { Repository } from '../repository';
import { DogModel } from './dog.m.model';

export class DogRepo implements Repository<Dog> {
  constructor() {}

  async create(data: Omit<Dog, 'id'>): Promise<Dog> {
    const newUser = await DogModel.create(data);
    return newUser;
  }

  async search({ key, value }: { key: string; value: unknown }): Promise<Dog> {
    const result = await DogModel.find({ [key]: value });
    return result[0];
  }

  async queryAll(): Promise<Dog[]> {
    const allData = await DogModel.find({});
    return allData;
  }

  async queryById(id: string): Promise<Dog> {
    const result = await DogModel.findById(id);
    if (result === null) throw new Error('Not found');
    return result;
  }
}