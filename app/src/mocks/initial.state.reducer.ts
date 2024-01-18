import { dogState } from '../store/reducers/dogs.reducer';
import { accountState } from '../store/reducers/accounts.reducer';

export const initialStateDogs: dogState = {
  dogs: [],
  dog: undefined,
};

export const initialStateAccount: accountState = {
  accountLogged: {
    token: undefined,
    user: undefined,
  },
  shelter: undefined,
};
