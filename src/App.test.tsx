import 'react-intersection-observer/test-utils';
import userEvent from '@testing-library/user-event';
import { render, waitFor, act, screen } from '@testing-library/react';

import { character } from 'mocks';

import App from './App';

test('renders app component correctly', async () => {
  const { container } = render(<App />);
  let spin = container.querySelector('.spin');

  expect(spin).toBeInTheDocument();

  await waitFor(() => {
    expect(spin).not.toBeInTheDocument();
  });

  expect(container.querySelector('.characters-page')).toBeInTheDocument();

  const link = container.querySelector('a');
  act(() => {
    if (link) userEvent.click(link);
  });

  await waitFor(() =>
    expect(container.querySelector('.character-page')).toBeInTheDocument()
  );

  spin = container.querySelector('.spin');

  expect(spin).toBeInTheDocument();

  await waitFor(() => {
    expect(spin).not.toBeInTheDocument();
  });

  expect(screen.getByText(character[1].character?.name)).toBeInTheDocument();
});
