// import { Dog } from '../models/dog.type';
import { DogRepository } from './dogs.repository';

jest.mock('../config', () => ({
  url: '',
}));

describe('DogRepository', () => {
  const dogRepo: DogRepository = new DogRepository();

  describe('get all dogs', () => {
    test('should call to get all dogs', async () => {
      const mockData = [{}];
      const expectedUrl = 'http://localhost:3000/dog';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await dogRepo.getAll();

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockData);
    });
  });

  describe('get dogs by shelter', () => {
    test('should call to get dogs by shelter', async () => {
      const mockData = [{}];
      const expectedUrl = 'http://localhost:3000/dog/dogByShelter/1/false';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await dogRepo.getDogsByShelter('1', false);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockData);
    });
  });

  describe('add dog', () => {
    test('should call to add dog', async () => {
      const mockData = {};
      const expectedUrl = 'http://localhost:3000/dog';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await dogRepo.addDog({}, 'token');

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        },
      });
      expect(response).toEqual(mockData);
    });
  });
});
