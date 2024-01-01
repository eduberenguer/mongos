/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { Controller } from './controller';
import { User } from '../entities/user.js';

export class UserController extends Controller<User> {
  constructor(public path: string) {
    super();
  }

  async register(res: Response) {
    res.send('¡Hola usuarios!');
  }
}
