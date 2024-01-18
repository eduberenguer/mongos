import { Dog } from '../../models/dog.type';
import { dogsActions } from '../actions/dogs.actions';
import { DogActions } from '../actions.creators/dogs.action.creator';

export type dogState = {
  dogs: Dog[];
  dog: Dog | undefined;
};

export const dogReducer = (state: dogState, action: DogActions): dogState => {
  switch (action.type) {
    case dogsActions.load:
      return {
        ...state,
        dogs: action.payload as Dog[],
        dog: undefined,
      };
    case dogsActions.loadByShelter:
      return {
        ...state,
        dogs: action.payload as Dog[],
      };
    case dogsActions.addDog:
      return {
        ...state,
        dogs: [...state.dogs, action.payload as Dog],
      };
    case dogsActions.updateDog:
      return {
        ...state,
        dogs: state.dogs.map((dog) => {
          if (dog.id === (action.payload as Dog).id) {
            return action.payload as Dog;
          }
          return dog;
        }),
      };
    case dogsActions.loadDog:
      return {
        ...state,
        dog: action.payload as Dog,
      };
    default:
      return state;
  }
};
