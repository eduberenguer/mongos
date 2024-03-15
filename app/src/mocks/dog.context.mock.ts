import { UseDogStructured } from '@/context/context';
import { dogState } from '@/store/reducers/dogs.reducer';

const dogState: dogState = {
  dogs: [],
};

export const mockDogContext: UseDogStructured = {
  stateDogs: dogState,
  getDogs: jest.fn(),
  getDogsByShelter: jest.fn(),
  addDog: jest.fn(),
  loading: false,
};
