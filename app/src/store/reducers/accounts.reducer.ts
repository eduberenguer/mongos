import { Shelter } from '@/models/shelter.type';
import { User } from '@/models/user.type';
import { AccountsActions } from '../actions.creators/accounts.action.creator';
import { accountsActions } from '../actions/accounts.actions';

export type accountState = {
  accountLogged: {
    token?: string;
    user: Shelter | User | undefined;
  };
  shelter: Shelter | undefined;
};

export type accountsActionsToken = {
  type: string;
  payload?: {
    token?: string;
    user: Shelter | User | undefined;
  };
};

export const accountReducer = (
  state: accountState,
  action: AccountsActions | accountsActionsToken
): accountState => {
  switch (action.type) {
    case accountsActions.create:
      return {
        ...state,
        accountLogged: {
          ...state.accountLogged,
          token: (action.payload as { token?: string }).token,
          user: (action.payload as { user?: User }).user,
        },
      };
    case accountsActions.login:
      return {
        ...state,
        accountLogged: {
          ...state.accountLogged,
          token: (action.payload as { token?: string }).token,
          user: (action.payload as { user?: User }).user,
        },
      };
    case accountsActions.loginWithToken:
      return {
        ...state,
        accountLogged: {
          ...state.accountLogged,
          token: (action.payload as { token?: string }).token,
          user: (action.payload as { user?: User }).user,
        },
      };
    case accountsActions.logout:
      return {
        ...state,
        accountLogged: action.payload as accountState['accountLogged'],
      };
    case accountsActions.loadShelter:
      return {
        ...state,
        shelter: action.payload as Shelter,
      };
    case accountsActions.updateDogFavourite:
      return {
        ...state,
        accountLogged: {
          ...state.accountLogged,
          user: action.payload as User,
        },
      };
    default:
      return state;
  }
};
