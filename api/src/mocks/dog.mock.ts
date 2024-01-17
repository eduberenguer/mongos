import { Personality, Size } from '../entities/dog';

export const mockDog = {
  id: '1',
  name: 'Brutus',
  breed: 'Bulldog',
  gender: 'male',
  image: '',
  years: 1,
  months: 2,
  description: 'Brutus is a very good dog',
  size: 'small' as Size,
  chipNumber: 123456789123231,
  shelter: {
    id: '1',
    shelterName: 'John Doe',
  },
  personality: ['calm', 'aggressive', 'anxious'] as Personality[],
  views: 0,
  requests: 0,
  adoptedBy: '',
  hasBreed: true,
  registerDate: new Date('1995-12-17T03:24:00'),
  archived: false,
};
