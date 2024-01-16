import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Card } from './card';
import { mockDog } from '../../mocks/dog.mock';

jest.mock('../../config', () => ({
  url: '',
}));

describe('Given a Card component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Card {...mockDog} />;
      </BrowserRouter>
    );
  });

  test("then it should show the word 'Brutus'", () => {
    const name = 'Brutus';

    const label = screen.getByText(name);

    expect(label).toBeInTheDocument();
  });
});
