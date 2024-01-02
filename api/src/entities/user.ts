export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
  favourites: string[];
  registerDate: Date;
  friends: string[];
  lifestyle: Lifestyle[];
};

export type Lifestyle = 'home lifestyle' | 'outdoor lifestyle' | 'sport lifestyle';
