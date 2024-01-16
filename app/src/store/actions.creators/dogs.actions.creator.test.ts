import { dogsActions } from '../actions/dogs.actions';
import { loadDogs, loadByShelter, addDog } from './dogs.action.creator';
import { mockDog } from '../../mocks/dog.mock';
// import { initialStateDog } from '../../mocks/initial.state.reducer';

describe('Given an dogsActions function', () => {
  test('When it is called with a load action', () => {
    const element = loadDogs([mockDog]);
    const result = {
      type: dogsActions.load,
      payload: [mockDog],
    };

    expect(element).toEqual(result);
  });

  test('When it is called with a loadByShelter action', () => {
    const element = loadByShelter([mockDog]);
    const result = {
      type: dogsActions.load,
      payload: [mockDog],
    };

    expect(element).toEqual(result);
  });

  test('When it is called with a addDog action', () => {
    const element = addDog(mockDog);
    const result = {
      type: dogsActions.addDog,
      payload: mockDog,
    };

    expect(element).toEqual(result);
  });
});
