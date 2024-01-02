import { Response, Request, NextFunction } from 'express';
import { Controller } from './controller';
import { ShelterRepo } from '../repository/shelter/shelter.m.repository';
import { Shelter } from '../entities/shelter';

export class ShelterController extends Controller<Shelter> {
  constructor(public repo: ShelterRepo) {
    super();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.repo.create(req.body));
    } catch (error) {
      next(error);
    }
  }
}
