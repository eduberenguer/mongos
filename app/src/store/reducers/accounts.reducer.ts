import { Shelter } from '../../models/shelter.type';
import { User } from '../../models/user.type';
import { accountsActions } from '../actions/accounts.actions';

export type accountState = {
  accountLogged: {
    token?: string;
    user: Shelter | User | undefined;
  };
  shelter: Shelter | undefined;
};

export const accountReducer = (
  state: accountState,
  action: any
): accountState => {
  switch (action.type) {
    case accountsActions.create:
      return {
        ...state,
        accountLogged: {
          ...state.accountLogged,
          token: action.payload.token,
          user: action.payload.user,
        },
      };
    case accountsActions.login:
      return {
        ...state,
        accountLogged: {
          ...state.accountLogged,
          token: action.payload.token,
          user: action.payload.user,
        },
      };
    case accountsActions.loginWithToken:
      return {
        ...state,
        accountLogged: {
          ...state.accountLogged,
          token: action.payload.token,
          user: action.payload.user,
        },
      };
    case accountsActions.logout:
      return {
        ...state,
        accountLogged: action.payload,
      };
    case accountsActions.loadShelter:
      return {
        ...state,
        shelter: action.payload,
      };
    case accountsActions.updateDogFavourite:
      return {
        ...state,
        accountLogged: {
          ...state.accountLogged,
          user: action.payload,
        },
      };
    default:
      return state;
  }
};
