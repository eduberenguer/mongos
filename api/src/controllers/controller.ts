import { NextFunction, Request, Response } from 'express';
import { Repository } from '../repository/repository';

export abstract class Controller<T extends { id: string | number }> {
  public repo!: Repository<T>;

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.repo.queryAll();
      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.repo.queryById(req.params.id));
    } catch (error) {
      next(error);
    }
  }

  async getAllDogsByShelter(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.repo.searchByOptions({ key: 'shelter', value: req.params.id }));
    } catch (error) {
      next(error);
    }
  }
}
