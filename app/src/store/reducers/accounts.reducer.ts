import { Shelter } from '../../models/shelter.type';
import { User } from '../../models/user.type';
import { accountsActions } from '../actions/accounts.actions';
import { AccountsActions } from '../actions.creators/accounts.action.creator';

export type accountState = {
  accountLogged: Shelter | User | undefined;
};

export const accountReducer = (
  state: accountState,
  action: AccountsActions
): accountState => {
  switch (action.type) {
    case accountsActions.create:
      return {
        ...state,
        accountLogged: action.payload as Shelter | User,
      };
    default:
      return state;
  }
};
