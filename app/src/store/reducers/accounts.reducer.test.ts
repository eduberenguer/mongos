import { accountMock } from '../../mocks/account.mock';
import { accountsActions } from '../actions/accounts.actions';
import { accountReducer, accountState } from './accounts.reducer';

const initialState: accountState = {
  accountLogged: {
    token: '123123123123',
    user: accountMock,
  },
};

describe('Given a characters reducer', () => {
  describe("When it's rendered", () => {
    test('should return the state with load action', async () => {
      const account = {
        token: '123123123123',
        user: accountMock,
      };
      const action = {
        type: accountsActions.create,
        payload: account,
      };

      const state = await accountReducer(initialState, action);
      expect(state.accountLogged.token).toEqual(account.token);
    });

    test('should return the state with load action', async () => {
      const account = {
        user: accountMock,
        token: 'nuevoToken',
      };

      const action = {
        type: accountsActions.login,
        payload: account,
      };

      const state = await accountReducer(initialState, action);

      expect(state.accountLogged.token).toEqual('nuevoToken');
    });

    test('should return the state with logout action', async () => {
      const action = {
        type: accountsActions.logout,
        payload: {},
      };

      const state = await accountReducer(initialState, action);

      expect(state.accountLogged.token).toEqual(undefined);
    });

    test('should return the state with default action', async () => {
      const action = {
        type: 'default',
        payload: {},
      };

      const state = await accountReducer(initialState, action);

      expect(state.accountLogged.token).toEqual('123123123123');
    });
  });
});
