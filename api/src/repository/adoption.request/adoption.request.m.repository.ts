import { AdoptionRequest } from '../../entities/adoption.request';
import { Repository } from '../repository';
import { AdoptionRequestModel } from './adoption.request.m.model';

export class AdoptionRequestRepo implements Repository<AdoptionRequest> {
  constructor() {}

  async create(data: Omit<AdoptionRequest, 'id'>): Promise<AdoptionRequest> {
    const newAdoptionRequest = await AdoptionRequestModel.create(data);

    return newAdoptionRequest;
  }

  async search({ key, value }: { key: string; value: unknown }): Promise<AdoptionRequest> {
    const result = await AdoptionRequestModel.find({ [key]: value });

    return result[0];
  }

  async searchByOptions(queries: { key: string; value: unknown }[]): Promise<AdoptionRequest[]> {
    const queryObj: { [key: string]: unknown } = {};
    queries.forEach((query) => {
      queryObj[query.key] = query.value;
    });
    const result = await AdoptionRequestModel.find(queryObj)
      .populate({
        path: 'shelterId',
        select: 'shelterName email',
      })
      .populate({
        path: 'dogId',
        select: 'name image',
      })
      .populate({
        path: 'userId',
        select: 'userName email',
      })
      .exec();

    return result;
  }

  async queryAll(): Promise<AdoptionRequest[]> {
    const allData = await AdoptionRequestModel.find()
      .populate({
        path: 'shelterId',
        select: 'shelterName email',
      })
      .populate({
        path: 'dogId',
        select: 'name image',
      })
      .populate({
        path: 'userId',
        select: 'userName email',
      })
      .exec();

    return allData;
  }

  async queryById(id: string): Promise<AdoptionRequest> {
    const result = await AdoptionRequestModel.findById(id)
      .populate({
        path: 'shelterId',
        select: 'shelterName email',
      })
      .populate({
        path: 'dogId',
        select: 'name image',
        model: 'dog',
      })
      .populate({
        path: 'userId',
        select: 'userName email',
      })
      .exec();
    if (result === null) throw new Error('Not found');

    return result;
  }

  async update(id: string, data: Partial<AdoptionRequest>): Promise<AdoptionRequest> {
    const result = await AdoptionRequestModel.findOneAndUpdate({ _id: id }, data, { new: true });
    if (result === null) throw new Error('Not found');

    return result;
  }

  async delete(id: string): Promise<AdoptionRequest> {
    const result = await AdoptionRequestModel.findOneAndDelete({ _id: id });
    if (result === null) throw new Error('Not found');

    return result;
  }

  async checkDogIsAdoptionRequest(dogId: string, userId: string): Promise<AdoptionRequest> {
    const result = await AdoptionRequestModel.findOne({ dogId, userId });
    if (result === null) throw new Error('Not found');

    return result;
  }
}
