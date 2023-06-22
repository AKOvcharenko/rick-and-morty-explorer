import { render, screen } from '@testing-library/react';

import App from './App';

test.skip('renders app component correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/it is a rick and morty explorer app/i);
  expect(linkElement).toBeInTheDocument();
});
