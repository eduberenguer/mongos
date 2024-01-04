type Personality =
  | 'calm'
  | 'aggressive'
  | 'reactive'
  | 'anxious'
  | 'child friendly'
  | 'dog tested'
  | 'cat tested'
  | 'active';

type Size = 'small' | 'medium' | 'large' | 'extra large' | 'giant';

type shelterDog = {
  _id: string;
  shelterName: string;
};

export type Dog = {
  id: string;
  name: string;
  image: string;
  age: string;
  size: Size;
  chipNumber: number;
  shelter: shelterDog;
  personality: Personality[];
  views: number;
  requests: number;
  adoptedBy: string | undefined;
  hasBreed: boolean;
  breed: string | undefined;
  registerDate: Date;
  description: string;
};
