import { dogState } from '../store/reducers/dogs.reducer';
import { accountState } from '../store/reducers/accounts.reducer';
import { adoptionRequestState } from '../store/reducers/adoption.request.reducer';

export const initialStateDogs: dogState = {
  dogs: [],
  dog: undefined,
  shelterDogs: [],
};

export const initialStateAccount: accountState = {
  accountLogged: {
    token: undefined,
    user: undefined,
  },
  shelter: undefined,
};

export const initialStateAdoptionRequest: adoptionRequestState = {
  adoptionRequests: [],
};
