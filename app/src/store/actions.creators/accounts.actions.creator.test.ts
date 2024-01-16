import { accountsActions } from '../actions/accounts.actions';
import {
  createAccounts,
  loginAccounts,
  logout,
} from './accounts.action.creator';
import { accountMock } from '../../mocks/account.mock';
import { initialStateAccount } from '../../mocks/initial.state.reducer';

describe('Given an accountsActions function', () => {
  test('When it is called with a create action', () => {
    const element = createAccounts(accountMock);
    const result = {
      type: accountsActions.create,
      payload: accountMock,
    };

    expect(element).toEqual(result);
  });

  test('When it is called with a login action', () => {
    const login = {
      token: '12312312312',
      user: accountMock,
    };
    const element = loginAccounts(login);
    const result = {
      type: accountsActions.login,
      payload: {
        token: '12312312312',
        user: accountMock,
      },
    };
    expect(element).toEqual(result);
  });

  test('When it is called with a logout action', () => {
    const element = logout(initialStateAccount.accountLogged);
    const result = {
      type: accountsActions.logout,
      payload: initialStateAccount.accountLogged,
    };

    expect(element).toEqual(result);
  });
});
