import { NextFunction, Request, Response } from 'express';
import { AccountsController } from './account.controller';
import { UserRepo } from '../repository/user/user.m.repository';

describe('Given a UserController class', () => {
  describe('When its instantiated', () => {
    const mockRepo = {
      search: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as UserRepo;
    const req = {
      body: {},
    } as unknown as Request;
    const res = {
      send: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    test('Then the register method should be used', async () => {
      const controller = new AccountsController(mockRepo);
      const mockPassword = '123';
      req.body = { password: mockPassword };
      await controller.register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockRepo.create).toHaveBeenCalled();
    });

    test('Then the login method should be used', async () => {
      const controller = new AccountsController(mockRepo);
      const mockEmail = 'test@gmail.com';
      const mockPassword = '123';

      req.body = { email: mockEmail, password: mockPassword };

      await controller.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
});
