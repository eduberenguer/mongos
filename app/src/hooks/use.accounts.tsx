import { useReducer } from 'react';
import { initialStateAccount } from '../mocks/initial.state.reducer';
import { AccountRepository } from '../services/shelter.repository';
import { accountReducer } from '../store/reducers/accounts.reducer';
import * as ac from '../store/actions.creators/accounts.action.creator';
import { Shelter } from '../models/shelter.type';
import { User } from '../models/user.type';

export function useAccounts() {
  const repo = new AccountRepository();
  const [stateAccount, dispatch] = useReducer(
    accountReducer,
    initialStateAccount
  );

  const create = async (item: Partial<Shelter | User>) => {
    const response = await repo.create(item);

    dispatch(ac.createAccounts(response));
  };

  return {
    stateAccount,
    create,
  };
}
