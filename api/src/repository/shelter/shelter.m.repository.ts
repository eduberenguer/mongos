import { Shelter } from '../../entities/shelter';
import { Repository } from '../repository';
import { ShelterModel } from './shelter.m.model';

export class ShelterRepo implements Repository<Shelter> {
  constructor() {}

  async create(data: Omit<Shelter, 'id'>): Promise<Shelter> {
    const newUser = await ShelterModel.create(data);
    return newUser;
  }

  async queryAll(): Promise<Shelter[]> {
    const allData = await ShelterModel.find({});
    return allData;
  }
}
