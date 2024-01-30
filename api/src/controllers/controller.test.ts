import { UserRepo } from '../repository/user/user.m.repository';
import { AccountsController } from './account/account.controller';
import { NextFunction, Request, Response } from 'express';

let mockUserRepo: UserRepo;
let req: Request;
let res: Response;
let next: NextFunction;

describe('getUsers', () => {
  beforeEach(() => {
    mockUserRepo = {
      queryAll: jest.fn(),
    } as unknown as UserRepo;

    req = {
      query: {},
      body: {},
      params: {},
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost:3000/users'),
      baseUrl: '/film',
    } as unknown as Request;
    res = {
      send: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    next = jest.fn() as NextFunction;
  });

  it('Test callef getAll function"', async () => {
    const controller = new AccountsController(mockUserRepo);

    req.query = { page: '2' };
    await controller.getAll(req, res, next);

    expect(res.send).toHaveBeenCalled();
  });
});
