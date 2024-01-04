import { dogsActions } from '../actions/dogs.actions';
import { Dog } from '../../models/dog.type';

export interface DogActions {
  type: string;
  payload?: Dog | Dog[];
}

export const loadDogs = (payload: Dog[]): DogActions => {
  return {
    type: dogsActions.load,
    payload,
  };
};
