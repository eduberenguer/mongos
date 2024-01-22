import { useReducer, useState } from 'react';
import { initialStateAccount } from '../mocks/initial.state.reducer';
import { AccountRepository } from '../services/accounts/account.repository';
import { accountReducer } from '../store/reducers/accounts.reducer';
import * as ac from '../store/actions.creators/accounts.action.creator';
import { Shelter } from '../models/shelter.type';
import { User } from '../models/user.type';
import { LocaStorage } from '../services/accounts/local.storage';

export function useAccounts() {
  const [loading, setLoading] = useState<boolean>(false);
  const repo = new AccountRepository();
  const [stateAccount, dispatch] = useReducer(
    accountReducer,
    initialStateAccount
  );
  const userStore = new LocaStorage<{ token: string; role: string }>('user');

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
    userStore.set({ token: response.token, role: response.user.role });
    return response;
  };

  const loginWithToken = async () => {
    const userStoreData = userStore.get();
    if (userStoreData) {
      const { token, role } = userStoreData;
      const response = await repo.loginWithToken({ token, role });
      dispatch(
        ac.loginWithToken({
          token: response.token,
          user: response.user,
        })
      );
    }
  };

  const logout = async () => {
    dispatch(ac.logout(initialStateAccount.accountLogged));
    userStore.remove();
  };

  const getShelterById = async (shelterId: string) => {
    try {
      const response = await repo.retrievedShelterById(shelterId);
      dispatch(ac.loadShelter(response));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    stateAccount,
    create,
    login,
    loginWithToken,
    logout,
    loading,
    getShelterById,
  };
}
