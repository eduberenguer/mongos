import { User } from '../../../models/user.type';

export const initialValueShelter = {
  shelterName: '',
  email: '',
  password: '',
  address: '',
  province: '',
  registerDate: new Date(),
  avatar: null,
  role: 'shelter',
};

export const initialValueUser: Partial<User> = {
  userName: '',
  email: '',
  password: '',
  address: '',
  avatar: null,
  favourites: [],
  registerDate: new Date(),
  friends: [],
  lifestyle: [],
  role: 'user',
};
