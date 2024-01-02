import { Response, Request, NextFunction } from 'express';
import { Controller } from './controller';
import { User } from '../entities/user.js';
import { UserRepo } from '../repository/user/user.m.repository';

export class UserController extends Controller<User> {
  constructor(public repo: UserRepo) {
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
