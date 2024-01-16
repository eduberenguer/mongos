import '@testing-library/jest-dom';
import Home from './home';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockDogContext } from '../../mocks/dog.context.mock';
import { DogsContexts } from '../../context/context';

jest.mock('../../config', () => ({
  url: '',
}));

describe('Home', () => {
  beforeAll(() => {
    render(
      <DogsContexts.Provider value={mockDogContext}>
        <Router>
          <Home />
        </Router>
      </DogsContexts.Provider>
    );
  });

  test('should render Home component', () => {
    const text = screen.getByText('No register dogs');

    expect(text).toBeInTheDocument();
  });
});
