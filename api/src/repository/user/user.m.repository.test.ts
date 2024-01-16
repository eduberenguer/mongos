import { Role, User } from '../../entities/user';
import { UserModel } from './user.m.model';
import { UserRepo } from './user.m.repository';

jest.mock('./user.m.model');

describe('UserRepo', () => {
  const repo = new UserRepo();

  describe('create', () => {
    test('should create a new user', async () => {
      const mockUser: User = {
        id: '1',
        userName: 'test',
        email: 'test@email.com',
        password: '',
        role: 'user' as Role,
        registerDate: new Date(),
        avatar: 'image test',
        address: 'granvia 2',
        favourites: [],
        friends: [],
        lifestyle: [],
      };

      UserModel.create = jest.fn().mockReturnValueOnce(mockUser);
      const result = await repo.create(mockUser);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    test('should search a user', async () => {
      const mockData = [{ email: 'test@mail.com' }];

      const exec = jest.fn().mockResolvedValueOnce(mockData);
      UserModel.find = jest.fn().mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          exec,
        }),
      });

      const result = await repo.search({ key: 'email', value: mockData[0].email });
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });

    test('should search all', async () => {
      const mockUserArray: User[] = [];
      UserModel.find = jest.fn().mockResolvedValueOnce(mockUserArray);

      const result = await repo.queryAll();

      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockUserArray);
    });

    test('should search by id', async () => {
      const mockUser: Partial<User> = {
        id: '1',
        userName: 'test',
        email: 'test@gmail.com',
      };

      UserModel.findById = jest.fn().mockResolvedValueOnce(mockUser);

      const result = await repo.queryById(mockUser.id as string);

      expect(UserModel.findById).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    test('should search by options', async () => {
      const mockUserArray: User[] = [];
      const mockQuery = [{ key: 'email', value: 'test@gmail.com' }];

      UserModel.find = jest.fn().mockResolvedValueOnce(mockUserArray);

      const result = await repo.searchByOptions(mockQuery);

      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockUserArray);
    });
  });
});
