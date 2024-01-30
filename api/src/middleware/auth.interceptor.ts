import { Request, Response, NextFunction } from 'express';
import { ShelterRepo } from '../repository/shelter/shelter.m.repository';
import { ShelterModel } from '../repository/shelter/shelter.m.model';
import { DogModel } from '../repository/dog/dog.m.model';
import { UserRepo } from '../repository/user/user.m.repository';
import { UserModel } from '../repository/user/user.m.model';
import { AuthServices } from '../services/auth';
import { AdoptionRequestRepo } from '../repository/adoption.request/adoption.request.m.repository';

export class Interceptor {
  constructor(protected repo: ShelterRepo | UserRepo | AdoptionRequestRepo) {}

  logged(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader) {
        throw new Error('Not Authorization header');
      }

      if (!authHeader.startsWith('Bearer')) {
        throw new Error('Not Bearer in Authorization header');
      }

      const token = authHeader.slice(7);
      const payload = AuthServices.verifyJWTGettingPayload(token);

      req.body.tokenPayload = payload;
      next();
    } catch (error) {
      next(error);
    }
  }

  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('Authorization');
      if (!tokenHeader?.startsWith('Bearer')) throw new Error('Unauthorized');

      const token = tokenHeader.split(' ')[1];
      const tokenPayload = AuthServices.verifyJWTGettingPayload(token);
      req.body.userId = tokenPayload.id;
      req.body.tokenRole = tokenPayload.role;
      next();
    } catch (error) {
      console.log('error', error);
      next(error);
    }
  }

  async authorizedForRegister(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body || typeof req.body !== 'object') {
        throw new Error('Invalid request body');
      }

      const shelterExist = await ShelterModel.findOne({ email: req.body.email });
      const userExist = await UserModel.findOne({ email: req.body.email });

      if (shelterExist || userExist) {
        throw new Error('Mail already exists');
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async authorizedAddDog(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body || typeof req.body !== 'object') {
        throw new Error('Invalid request body');
      }

      const dogExist = await DogModel.findOne({ chipNumber: req.body.chipNumber });
      if (dogExist) {
        throw new Error('Dog already exists');
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
