import { Lifestyle } from '../../../models/user.type';

export interface ShelterFormFields {
  shelterName: string;
  email: string;
  password: string;
  address: string;
  registerDate: Date;
  avatar: File | undefined | string | null;
  role: string;
}

export interface UserFormFields {
  userName: string | undefined;
  email: string;
  password: string;
  address: string;
  avatar: File | undefined | string | null;
  favourites: string[];
  registerDate: Date;
  friends: string[];
  lifestyle: Lifestyle[];
  role: string;
}
