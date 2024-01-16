import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import Login from './login';

jest.mock('../../config', () => ({
  url: '',
}));

describe('Login component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });

  test('renders login form', () => {
    const elements = screen.getAllByRole('radio');

    expect(elements.length).toBe(2);
  });
});
