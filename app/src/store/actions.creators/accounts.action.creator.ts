import { accountsActions } from '../actions/accounts.actions';
import { Shelter } from '../../models/shelter.type';
import { User } from '../../models/user.type';

export interface AccountsActions {
  type: string;
  payload?:
    | Shelter
    | Shelter[]
    | User
    | User[]
    | Partial<Shelter | User>
    | Partial<Shelter | User>[];
}

export interface AccountsActionsLogin {
  type: string;
  payload?: accountState;
}

export type accountState = {
  token?: string;
  user: Shelter | User | undefined;
};

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

export const loadShelter = (payload: Shelter): AccountsActions => {
  return {
    type: accountsActions.loadShelter,
    payload,
  };
};

export const updateDogFavourite = (payload: Partial<User>): AccountsActions => {
  return {
    type: accountsActions.updateDogFavourite,
    payload,
  };
};
