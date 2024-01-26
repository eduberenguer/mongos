import { accountsActions } from '../actions/accounts.actions';
import { Shelter } from '../../models/shelter.type';
import { User } from '../../models/user.type';

export interface AccountsActions {
  type: string;
  payload?: Shelter | Shelter[] | User | User[] | Partial<Shelter | User>;
}

export type accountState = {
  token?: string;
  user: Shelter | User | undefined;
};

export interface AccountsActionsLogin {
  type: string;
  payload?: accountState;
}

export const createAccounts = (payload: Shelter | User): AccountsActions => {
  return {
    type: accountsActions.create,
    payload,
  };
};

export const loginAccounts = (payload: accountState): AccountsActionsLogin => {
  return {
    type: accountsActions.login,
    payload,
  };
};

export const loginWithToken = (payload: accountState): AccountsActionsLogin => {
  return {
    type: accountsActions.loginWithToken,
    payload,
  };
};

export const logout = (payload: accountState): AccountsActionsLogin => {
  return {
    type: accountsActions.logout,
    payload,
  };
};

export const loadShelter = (payload: Shelter): any => {
  return {
    type: accountsActions.loadShelter,
    payload,
  };
};

export const updateDogFavourite = (payload: Partial<User>): any => {
  return {
    type: accountsActions.updateDogFavourite,
    payload,
  };
};
