type Role = 'user' | 'shelter';

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

export type Lifestyle =
  | 'home lifestyle'
  | 'outdoor lifestyle'
  | 'sport lifestyle';
