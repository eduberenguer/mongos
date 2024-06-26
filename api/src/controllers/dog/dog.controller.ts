import { Request, Response, NextFunction } from 'express';
import { Dog, ShelterDog } from '../../entities/dog';
import { DogRepo } from '../../repository/dog/dog.m.repository';
import { PayloadToken } from '../../services/auth';
import { Controller } from '../controller';

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
      req.body.archived = true;
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

  async updateDog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body.tokenPayload as PayloadToken;
      const dog = await this.repo.queryById(req.params.id);
      if ((dog.shelter as ShelterDog).id !== id) {
        res.status(401).send({ message: 'You are not authorized to update this dog' });
      } else {
        const updatedDog = await this.repo.update(req.params.id, req.body);
        res.status(202).send(updatedDog);
      }
    } catch (error) {
      next(error);
    }
  }

  async updateDogViews(req: Request, res: Response, next: NextFunction) {
    try {
      const dog = await this.repo.queryById(req.params.id);
      const updatedDog = await this.repo.update(req.params.id, { views: dog.views + 1 });
      res.status(202).send(updatedDog);
    } catch (error) {
      next(error);
    }
  }

  async updateDogRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const dog = await this.repo.queryById(req.params.id);
      const updatedDog = await this.repo.update(req.params.id, { requests: dog.requests + 1 });
      res.status(202).send(updatedDog);
    } catch (error) {
      next(error);
    }
  }

  async updateDogAdoptedBy(req: Request, res: Response, next: NextFunction) {
    const { status, userId, dogId } = req.body;

    if (status === 'rejected') {
      return next();
    }

    try {
      const updatedDog = await this.repo.update(dogId, { adoptedBy: userId });
      res.status(202).send(updatedDog);
    } catch (error) {
      next(error);
    }
  }
}
