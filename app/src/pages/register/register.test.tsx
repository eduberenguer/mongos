import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import Register from './register';

jest.mock('../../config', () => ({
  url: '',
}));

describe('Register component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Register />
      </Router>
    );
  });

  test('renders register form', () => {
    const elements = screen.getAllByRole('radio');

    expect(elements.length).toBe(2);
  });
});
