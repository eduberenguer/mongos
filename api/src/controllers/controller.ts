import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class Controller<T extends { id: string | number }> {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = 'test123';
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
}
