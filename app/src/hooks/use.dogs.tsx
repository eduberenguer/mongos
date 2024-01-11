import { useReducer, useState } from 'react';
import { initialStateDogs } from '../mocks/initial.state.reducer';
import { DogRepository } from '../services/dogs.repository';
import { dogReducer } from '../store/reducers/dogs.reducer';
import * as ac from '../store/actions.creators/dogs.action.creator';
import { Dog } from '../models/dog.type';

export function useDogs() {
  const repo = new DogRepository();
  const [stateDogs, dispatch] = useReducer(dogReducer, initialStateDogs);
  const [loading, setLoading] = useState<boolean>(false);

  const getDogs = async () => {
    const response = await repo.getAll();
    dispatch(ac.loadDogs(response));
  };

  const getDogsByShelter = async (
    shelterId: string,
    showArchivedDogs: boolean
  ) => {
    const response = await repo.getDogsByShelter(shelterId, showArchivedDogs);
    dispatch(ac.loadByShelter(response));
  };

  const addDog = async (dog: Partial<Dog>, token: string) => {
    try {
      setLoading(true);
      const response = await repo.addDog(dog, token);
      dispatch(ac.addDog(response));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { stateDogs, getDogs, getDogsByShelter, addDog, loading };
}
