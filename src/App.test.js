import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the floating mirror portrait', () => {
  render(<App />);
  expect(screen.getByAltText(/portrait/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /akinlara/i })).toBeInTheDocument();
});
