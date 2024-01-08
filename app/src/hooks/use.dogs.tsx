import { useReducer } from 'react';
import { initialStateDogs } from '../mocks/initial.state.reducer';
import { DogRepository } from '../services/dogs.repository';
import { dogReducer } from '../store/reducers/dogs.reducer';
import * as ac from '../store/actions.creators/dogs.action.creator';
import { Dog } from '../models/dog.type';

export function useDogs() {
  const repo = new DogRepository();
  const [stateDogs, dispatch] = useReducer(dogReducer, initialStateDogs);

  const getDogs = async () => {
    const response = await repo.getAll();
    dispatch(ac.loadDogs(response));
  };

  const getDogsByShelter = async (shelterId: string) => {
    const response = await repo.getDogsByShelter(shelterId);
    dispatch(ac.loadByShelter(response));
  };

  const addDog = async (dog: Partial<Dog>, token: string) => {
    const response = await repo.addDog(dog, token);
    dispatch(ac.addDog(response));
  };

  return { stateDogs, getDogs, getDogsByShelter, addDog };
}
