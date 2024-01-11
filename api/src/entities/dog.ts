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

export type Dog = {
  id: string;
  name: string;
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
