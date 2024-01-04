import { accountsActions } from '../actions/accounts.actions';
import { Shelter } from '../../models/shelter.type';
import { User } from '../../models/user.type';

export interface AccountsActions {
  type: string;
  payload?: Shelter | Shelter[] | User | User[];
}

export const createAccounts = (payload: Shelter | User): AccountsActions => {
  return {
    type: accountsActions.create,
    payload,
  };
};
