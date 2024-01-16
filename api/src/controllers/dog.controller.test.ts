import { NextFunction, Request, Response } from 'express';
import { DogController } from './dog.controller';
import { DogRepo } from '../repository/dog/dog.m.repository';
import { mockDog } from '../mocks/dog.mock';

describe('Given a DogController class', () => {
  describe('When its instantiated', () => {
    const mockRepo = {
      search: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as DogRepo;
    const req = {
      body: {},
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(), // Asegúrate de que mockReturnThis() esté presente
      send: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    test('Then the addDog method should be used', async () => {
      const controller = new DogController(mockRepo);
      req.body = mockDog;
      req.body.tokenPayload = { id: '123' };
      await controller.addDog(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test('Then the getAllDogsByShelter method should be used', async () => {
      const controller = new DogController(mockRepo);
      req.params = { id: '123', showArchivedDogs: 'false' };

      await controller.getAllDogsByShelter(req, res, next);

      expect(res.send).toHaveBeenCalled();
    });
  });
});
