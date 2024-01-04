import { dogState } from '../store/reducers/dogs.reducer';
import { accountState } from '../store/reducers/accounts.reducer';

export const initialStateDogs: dogState = {
  dogs: [],
};

export const initialStateAccount: accountState = {
  accountLogged: undefined,
};
