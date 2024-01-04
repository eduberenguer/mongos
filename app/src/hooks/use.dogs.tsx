import { useReducer } from 'react';
import { initialStateDogs } from '../mocks/initial.state.reducer';
import { DogRepository } from '../services/dogs.repository';
import { dogReducer } from '../store/reducers/dogs.reducer';
import * as ac from '../store/actions.creators/dogs.action.creator';

export function useDogs() {
  const repo = new DogRepository();
  const [stateDogs, dispatch] = useReducer(dogReducer, initialStateDogs);

  const getDogs = async () => {
    const response = await repo.getAll();
    dispatch(ac.loadDogs(response));
  };

  return { stateDogs, getDogs };
}
