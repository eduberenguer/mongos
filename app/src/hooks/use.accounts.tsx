import { useReducer, useState } from 'react';
import { initialStateAccount } from '../mocks/initial.state.reducer';
import { AccountRepository } from '../services/account.repository';
import { accountReducer } from '../store/reducers/accounts.reducer';
import * as ac from '../store/actions.creators/accounts.action.creator';
import { Shelter } from '../models/shelter.type';
import { User } from '../models/user.type';

export function useAccounts() {
  const [loading, setLoading] = useState<boolean>(false);
  const repo = new AccountRepository();
  const [stateAccount, dispatch] = useReducer(
    accountReducer,
    initialStateAccount
  );

  const create = async (item: Partial<Shelter | User>) => {
    try {
      setLoading(true);
      const response = await repo.create(item);
      dispatch(ac.createAccounts(response));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (item: Partial<Shelter | User>) => {
    const response = await repo.login(item);
    dispatch(ac.loginAccounts(response));
    return response;
  };

  const logout = async () => {
    dispatch(ac.logout(initialStateAccount.accountLogged));
  };

  return {
    stateAccount,
    create,
    login,
    logout,
    loading,
  };
}
