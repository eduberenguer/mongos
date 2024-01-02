import { Request, Response, NextFunction } from 'express';
import { ShelterRepo } from '../repository/shelter/shelter.m.repository';
import { ShelterModel } from '../repository/shelter/shelter.m.model';
import { UserRepo } from '../repository/user/user.m.repository';

export class Interceptor {
  constructor(protected repo: ShelterRepo | UserRepo) {}

  async authorizedForRegister(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body || typeof req.body !== 'object') {
        throw new Error('Invalid request body');
      }
      const shelterExist = await ShelterModel.findOne({ email: req.body.email });
      if (shelterExist) {
        throw new Error('Shelter already exists');
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
