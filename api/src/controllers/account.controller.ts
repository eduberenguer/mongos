import { Response, Request, NextFunction } from 'express';
import { Controller } from './controller';
import { User } from '../entities/user.js';
import { Shelter } from '../entities/shelter';
import { Repository } from '../repository/repository';
import { AuthServices, PayloadToken } from '../services/auth';
import { LoginResponse } from '../types/response.api';

export class AccountsController<T extends User | Shelter> extends Controller<T> {
  public repo: Repository<T>;

  constructor(repo: Repository<T>) {
    super();
    this.repo = repo;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('req', req.body);
      const data = req.body as Omit<T, 'id'>;
      const password = await AuthServices.hash(data.password);
      req.body.password = password;
      res.send(await this.repo.create(data));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.email || !req.body.password) {
        throw new Error('Missing email or password');
      }

      const user = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isUserValid = await AuthServices.compare(req.body.password, user.password);

      if (!isUserValid) throw new Error('Invalid user or password');

      const payload: PayloadToken = {
        id: user.id,
        userName: user.email,
      };

      const token = AuthServices.createJWT(payload);

      const response: LoginResponse = {
        token,
        user,
      };

      res.send(response);
    } catch (error) {
      next(error);
    }
  }
}
