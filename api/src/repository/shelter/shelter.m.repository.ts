import { Shelter } from '../../entities/shelter';
import { Repository } from '../repository';
import { ShelterModel } from './shelter.m.model';

export class ShelterRepo implements Repository<Shelter> {
  constructor() {}

  async create(data: Omit<Shelter, 'id'>): Promise<Shelter> {
    const newUser = await ShelterModel.create(data);
    return newUser;
  }

  async search({ key, value }: { key: string; value: unknown }): Promise<Shelter> {
    const result = await ShelterModel.find({ [key]: value });
    return result[0];
  }

  async searchByOptions(queries: { key: string; value: unknown }[]): Promise<Shelter[]> {
    const queryObj: { [key: string]: unknown } = {};
    queries.forEach((query) => {
      queryObj[query.key] = query.value;
    });

    const result = await ShelterModel.find(queryObj);
    return result;
  }

  async queryAll(): Promise<Shelter[]> {
    const allData = await ShelterModel.find({});
    return allData;
  }

  async queryById(id: string): Promise<Shelter> {
    const result = await ShelterModel.findById(id);
    if (result === null) throw new Error('Not found');
    return result;
  }
}
