import { dogsActions } from '../actions/dogs.actions';
import { Dog } from '../../models/dog.type';

export interface DogActions {
  type: string;
  payload?: Dog | Dog[] | Partial<Dog>;
}

export const loadDogs = (payload: Dog[]): DogActions => {
  return {
    type: dogsActions.load,
    payload,
  };
};

export const loadByShelter = (payload: Dog[]): DogActions => {
  return {
    type: dogsActions.load,
    payload,
  };
};

export const addDog = (payload: Partial<Dog>): DogActions => {
  return {
    type: dogsActions.addDog,
    payload,
  };
};

export const updateDog = (payload: Partial<Dog>): DogActions => {
  return {
    type: dogsActions.updateDog,
    payload,
  };
};

export const loadDog = (payload: Dog): DogActions => {
  return {
    type: dogsActions.loadDog,
    payload,
  };
};

export const emptyDogs = (): DogActions => {
  return {
    type: dogsActions.emptyDogs,
    payload: [],
  };
};
