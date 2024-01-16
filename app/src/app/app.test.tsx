import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './app';
import { MemoryRouter as Router } from 'react-router-dom';
import { AccountsContexts, DogsContexts } from '../context/context';
import { mockDogContext } from '../mocks/dog.context.mock';
import { mockAccountContext } from '../mocks/account.context.mock';

jest.mock('../config', () => ({
  url: '',
}));

jest.mock('../pages/home/home', () => () => <div>Home page</div>);

describe('App', () => {
  it('renders without crashing', async () => {
    render(
      <Router>
        <AccountsContexts.Provider value={mockAccountContext}>
          <DogsContexts.Provider value={mockDogContext}>
            <App />
          </DogsContexts.Provider>
        </AccountsContexts.Provider>
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText('Logo')).toBeInTheDocument();
    });
  });
});
