import { Dog } from '../../models/dog.type';
import { dogsActions } from '../actions/dogs.actions';
import { dogReducer, dogState } from './dogs.reducer';
import { mockDog } from '../../mocks/dog.mock';

const initialState: dogState = {
  dogs: [],
};

describe('Given a characters reducer', () => {
  describe("When it's rendered", () => {
    test('should return the state with load action', () => {
      const dogs: Dog[] = [];
      const action = {
        type: dogsActions.load,
        payload: dogs,
      };
      const state = dogReducer(initialState, action);

      expect(state.dogs).toEqual(dogs);
    });
    test('should return the state with loadByShelter action', () => {
      const dogs: Dog[] = [];
      const action = {
        type: dogsActions.loadByShelter,
        payload: dogs,
      };
      const state = dogReducer(initialState, action);

      expect(state.dogs).toEqual(dogs);
    });

    test('should return the state with addDog action', () => {
      const action = {
        type: dogsActions.addDog,
        payload: mockDog,
      };
      const state = dogReducer(initialState, action);

      expect(state.dogs.length).toEqual(1);
    });

    test('should return the state with default action', () => {
      const action = {
        type: 'default',
        payload: {},
      };
      const state = dogReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });
});
