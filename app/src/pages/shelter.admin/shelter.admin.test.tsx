import '@testing-library/jest-dom';
import Admin from './shelter.admin';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockDogContext } from '../../mocks/dog.context.mock';
import { AccountsContexts, DogsContexts } from '../../context/context';
import { mockAccountContext } from '../../mocks/account.context.mock';

jest.mock('../../config', () => ({
  url: '',
}));

describe('Admin', () => {
  beforeAll(() => {
    render(
      <AccountsContexts.Provider value={mockAccountContext}>
        <DogsContexts.Provider value={mockDogContext}>
          <Router>
            <Admin />
          </Router>
        </DogsContexts.Provider>
      </AccountsContexts.Provider>
    );
  });

  test('should render Admin component', () => {
    const text = screen.getByText('Add new dog');

    expect(text).toBeInTheDocument();
  });
});
