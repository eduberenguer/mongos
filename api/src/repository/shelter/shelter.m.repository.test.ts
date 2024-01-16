import { ShelterModel } from './shelter.m.model';
import { Shelter } from '../../entities/shelter';
import { ShelterRepo } from './shelter.m.repository';

jest.mock('./shelter.m.model');

describe('ShelterRepo', () => {
  const repo = new ShelterRepo();
  test('should create a new shelter', async () => {
    const mockShelter: Shelter = {
      id: '1',
      shelterName: 'Shelter',
      email: 'shelter@gmail.com',
      password: '123',
      avatar: 'image shelter',
      address: 'granvia 12',
      registerDate: new Date(),
      role: 'shelter',
    };

    ShelterModel.create = jest.fn().mockReturnValueOnce(mockShelter);
    const result = await repo.create(mockShelter);
    expect(ShelterModel.create).toHaveBeenCalled();
    expect(result).toEqual(mockShelter);
  });

  test('should search a shelter', async () => {
    const mockData = [{ email: 'test@mail.com' }];

    const exec = jest.fn().mockResolvedValueOnce(mockData);
    ShelterModel.find = jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValueOnce({
        exec,
      }),
    });

    const result = await repo.search({ key: 'email', value: mockData[0].email });
    expect(ShelterModel.find).toHaveBeenCalled();
    expect(result).toEqual(undefined);
  });

  test('should search all', async () => {
    const mockUserArray: Shelter[] = [];
    ShelterModel.find = jest.fn().mockResolvedValueOnce(mockUserArray);

    const result = await repo.queryAll();

    expect(ShelterModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockUserArray);
  });

  test('should search by id', async () => {
    const mockShelter: Partial<Shelter> = {
      id: '1',
      shelterName: 'test',
      email: 'test@gmail.com',
    };

    ShelterModel.findById = jest.fn().mockResolvedValueOnce(mockShelter);

    const result = await repo.queryById(mockShelter.id as string);

    expect(ShelterModel.findById).toHaveBeenCalled();
    expect(result).toEqual(mockShelter);
  });

  test('should search by options', async () => {
    const mockShelterArray: Shelter[] = [];
    const mockQuery = [{ key: 'email', value: 'test@gmail.com' }];

    ShelterModel.find = jest.fn().mockResolvedValueOnce(mockShelterArray);

    const result = await repo.searchByOptions(mockQuery);

    expect(ShelterModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockShelterArray);
  });
});
