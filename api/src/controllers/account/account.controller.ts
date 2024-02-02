import { Response, Request, NextFunction } from 'express';
import { Controller } from '../controller';
import { User } from '../../entities/user.js';
import { Shelter } from '../../entities/shelter';
import { Repository } from '../../repository/repository';
import { AuthServices, PayloadToken } from '../../services/auth';
import { LoginResponse } from '../../types/response.api';

export class AccountsController<T extends User | Shelter> extends Controller<T> {
  public repo: Repository<T>;

  constructor(repo: Repository<T>) {
    super();
    this.repo = repo;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as Omit<T, 'id'>;
      const password = await AuthServices.hash(data.password);
      req.body.password = password;
      await this.repo.create(data);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method === 'PATCH') {
        const tokenHeader = req.get('Authorization');

        if (!tokenHeader?.startsWith('Bearer')) throw new Error('Unauthorized');

        const token = tokenHeader.split(' ')[1];
        const tokenPayload = AuthServices.verifyJWTGettingPayload(token);

        const user = await this.repo.search({
          key: '_id',
          value: tokenPayload.id,
        });

        if (!user) {
          throw new Error('User not found');
        }

        const response = {
          token,
          user,
        };

        res.send(response);
      } else {
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
      }
    } catch (error) {
      next(error);
    }
  }

  async updateDogFavourite(req: Request, res: Response, next: NextFunction) {
    try {
      const dogId = req.params.dogId;
      const userId = req.params.userId;

      const user = await this.repo.search({
        key: '_id',
        value: userId,
      });

      if (!user) {
        throw new Error('User not found');
      }

      const dog = (user as User).favourites.find((dog) => dog === dogId);

      if (dog) {
        (user as User).favourites = (user as User).favourites.filter((dog) => dog !== dogId);
        this.repo.update(userId, { favourites: (user as User).favourites.filter((dog) => dog !== dogId) });
      } else {
        (user as User).favourites.push(dogId);
        this.repo.update(userId, { favourites: [...(user as User).favourites] });
      }

      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  async checkDogDeletedandUpdateFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.repo.queryAll();

      const updatePromises = users.map(async (user) => {
        if ((user as User).favourites.includes(req.params.id)) {
          (user as User).favourites = (user as User).favourites.filter((dog) => dog !== req.params.id);
          await this.repo.update(user.id, { favourites: (user as User).favourites });
        }
      });

      await Promise.all(updatePromises);

      res.send('Favorites updated successfully.');
    } catch (error) {
      console.error('Error updating favorites:', error);
      next(error);
    }
  }
}
