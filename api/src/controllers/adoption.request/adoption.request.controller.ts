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
}
