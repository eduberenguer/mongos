import { Shelter } from '../entities/shelter';
import { User } from '../entities/user';

export type LoginResponse = {
  token: string;
  user: User | Shelter;
};
