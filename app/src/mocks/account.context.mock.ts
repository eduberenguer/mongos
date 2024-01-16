import { UseAccountStructured } from '../context/context';
import { accountState } from '../store/reducers/accounts.reducer';
import { accountMock } from './account.mock';

const accountState: accountState = {
  accountLogged: {
    token: '13123123123',
    user: accountMock,
  },
};

export const mockAccountContext: UseAccountStructured = {
  stateAccount: accountState,
  create: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  loading: false,
};
