import { Request, Response, NextFunction } from 'express';
import { AdoptionRequest } from '../../entities/adoption.request';
import { AdoptionRequestRepo } from '../../repository/adoption.request/adoption.request.m.repository';
import { Controller } from '../controller';
import { PayloadToken } from '../../services/auth';

export class AdoptionRequestController extends Controller<AdoptionRequest> {
  constructor(public repo: AdoptionRequestRepo) {
    super();
  }

  async addRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body.tokenPayload as PayloadToken;
      if (!id) {
        res.status(401).send({ message: 'You are not authorized to create this request' });
      }
      req.body.status = 'pending';
      req.body.createdAt = new Date();
      req.body.updatedAt = new Date();
      req.body.isRead = false;

      const createdRequest = await this.repo.create(req.body);
      res.status(201).send(createdRequest);
    } catch (error) {
      next(error);
    }
  }

  async getAdoptionRequestByShelter(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body.tokenPayload as PayloadToken;
      if (!id) {
        res.status(401).send({ message: 'You are not authorized to create this request' });
      }
      const requests = await this.repo.searchByOptions([{ key: 'shelterId', value: id }]);
      res.status(200).send(requests);
    } catch (error) {
      next(error);
    }
  }

  async getAdoptionRequestByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body.tokenPayload as PayloadToken;
      if (!id) {
        res.status(401).send({ message: 'You are not authorized to create this request' });
      }
      const requests = await this.repo.searchByOptions([{ key: 'userId', value: id }]);
      res.status(200).send(requests);
    } catch (error) {
      next(error);
    }
  }

  async updateAdoptionRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body.tokenPayload as PayloadToken;
      if (!id) {
        res.status(401).send({ message: 'You are not authorized to update this request' });
      }
      const updatedRequest = await this.repo.update(req.params.id, req.body);
      res.status(200).send(updatedRequest);
      next();
    } catch (error) {
      next(error);
    }
  }

  async checkDogIsAdoptionRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { dogId, userId } = req.params;
      const request = await this.repo.checkDogIsAdoptionRequest(dogId, userId);
      res.status(200).send(request);
    } catch (error) {
      next(error);
    }
  }

  async deleteAdoptionRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body.tokenPayload as PayloadToken;
      if (!id) {
        res.status(401).send({ message: 'You are not authorized to delete this request' });
      }
      const deletedRequest = await this.repo.delete(req.params.id);
      res.status(200).send(deletedRequest);
    } catch (error) {
      next(error);
    }
  }
}
