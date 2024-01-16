import { Dog } from '../entities/dog';
import { DogRepo } from '../repository/dog/dog.m.repository';
import { PayloadToken } from '../services/auth';
import { Controller } from './controller';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export class DogController extends Controller<Dog> {
  constructor(public repo: DogRepo) {
    super();
  }

  async addDog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body.tokenPayload as PayloadToken;
      req.body.shelter = id;
      req.body.views = 0;
      req.body.requests = 0;
      req.body.adoptedBy = undefined;
      req.body.registerDate = new Date();
      req.body.archived = false;
      delete req.body.tokenPayload;
      const createdDog = await this.repo.create(req.body);
      res.status(201).send(createdDog);
    } catch (error) {
      next(error);
    }
  }

  async getAllDogsByShelter(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(
        await this.repo.searchByOptions([
          { key: 'shelter', value: req.params.id },
          { key: 'archived', value: req.params.showArchivedDogs },
        ]),
      );
    } catch (error) {
      next(error);
    }
  }
}
