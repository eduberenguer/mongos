export type Personality =
  | 'calm'
  | 'aggressive'
  | 'anxious'
  | 'child friendly'
  | 'dog tested'
  | 'cat tested'
  | 'active'
  | 'familiar'
  | 'independent';

export type Size = 'small' | 'medium' | 'large' | 'extra large' | 'giant';

type ShelterDog = {
  id: string;
  shelterName: string;
};

export type Dog = {
  id: string;
  name: string;
  gender: string;
  image: File | string | null | undefined;
  years: number;
  months: number;
  size: Size;
  chipNumber: number;
  shelter: ShelterDog;
  personality: Personality[];
  views: number;
  requests: number;
  adoptedBy: string;
  hasBreed: boolean;
  breed: string;
  registerDate: Date;
  description: string;
  archived: boolean;
};
