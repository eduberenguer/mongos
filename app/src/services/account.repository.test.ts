import { Shelter } from '../models/shelter.type';
import { AccountRepository } from './account.repository';

describe('AccountRepository', () => {
  const accountsRepo: AccountRepository = new AccountRepository();

  describe('create a new shelter and login', () => {
    test('should call to create a new record', async () => {
      const mockData = { role: 'shelter' } as unknown as Shelter;
      const expectedUrl = 'http://localhost:3000/shelter/register';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await accountsRepo.create(mockData);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
      });

      expect(response).toEqual(mockData);
    });

    test('should call to log in with the correct parameters', async () => {
      const mockData = { role: 'shelter' } as unknown as Shelter;
      const expectedUrl = 'http://localhost:3000/shelter/login';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const response = await accountsRepo.login(mockData);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
      });

      expect(response).toEqual(mockData);
    });
  });
});
