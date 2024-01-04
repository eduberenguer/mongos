import { Dog } from '../../models/dog.type';
import { dogsActions } from '../actions/dogs.actions';
import { DogActions } from '../actions.creators/dogs.action.creator';

export type dogState = {
  dogs: Dog[];
};

export const dogReducer = (state: dogState, action: DogActions): dogState => {
  switch (action.type) {
    case dogsActions.load:
      return {
        ...state,
        dogs: action.payload as Dog[],
      };
    default:
      return state;
  }
};
