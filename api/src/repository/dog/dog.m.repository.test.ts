import { Dog } from '../../entities/dog';
import { DogModel } from './dog.m.model';
import { DogRepo } from './dog.m.repository';
import { mockDog } from '../../mocks/dog.mock';

jest.mock('./dog.m.model');

describe('DogRepo', () => {
  const repo = new DogRepo();

  test('should create a new dog', async () => {
    const dog: Dog = {
      ...mockDog,
      shelter: mockDog.shelter.id,
    };

    DogModel.create = jest.fn().mockReturnValueOnce(mockDog);

    const result = await repo.create(dog);

    expect(DogModel.create).toHaveBeenCalled();
    expect(result).toEqual(mockDog);
  });

  test('should search a dog', async () => {
    const mockData = [{ name: 'dog test' }];

    const exec = jest.fn().mockResolvedValueOnce(mockData);
    DogModel.find = jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValueOnce({
        exec,
      }),
    });

    const result = await repo.search({ key: 'name', value: mockData[0].name });
    expect(DogModel.find).toHaveBeenCalled();
    expect(result).toEqual(undefined);
  });

  test('should search all', async () => {
    const mockData = [{}] as unknown as Dog[];
    const exec = jest.fn().mockResolvedValueOnce(mockData);

    DogModel.find = jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValueOnce({
        exec,
      }),
    });

    const result = await repo.queryAll();

    expect(DogModel.find).toHaveBeenCalled();
    expect(exec).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test('should search by id', async () => {
    const mockDog: Partial<Dog> = {
      id: '1',
      name: 'dog test',
    };

    DogModel.findById = jest.fn().mockResolvedValueOnce(mockDog);

    const result = await repo.queryById(mockDog.id as string);

    expect(DogModel.findById).toHaveBeenCalled();
    expect(result).toEqual(mockDog);
  });

  test('should search by options', async () => {
    const mockDogArray: Dog[] = [];
    const mockQuery = [{ key: 'name', value: 'dog test' }];
    const exec = jest.fn().mockResolvedValueOnce(mockDogArray);

    DogModel.find = jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValueOnce({
        exec,
      }),
    });

    const result = await repo.searchByOptions(mockQuery);

    expect(DogModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockDogArray);
  });
});
