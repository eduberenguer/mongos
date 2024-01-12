type Role = 'user' | 'shelter';

export type Lifestyle =
  | 'home'
  | 'dog expert'
  | 'sport'
  | 'urban'
  | 'nature'
  | 'family'
  | 'children'
  | 'has dog'
  | 'has cat';

export type User = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  role: Role;
  avatar: File | string | null | undefined;
  address: string;
  favourites: string[];
  registerDate: Date;
  friends: string[];
  lifestyle: Lifestyle[];
};
