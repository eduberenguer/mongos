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

export type Dog = {
  id: string;
  name: string;
  gender: string;
  image: string;
  years: number;
  months: number;
  size: Size;
  chipNumber: number;
  shelter: string;
  personality: Personality[];
  views: number;
  requests: number;
  adoptedBy: string | undefined;
  hasBreed: boolean;
  breed: string | undefined;
  registerDate: Date;
  description: string;
  archived: boolean;
};
