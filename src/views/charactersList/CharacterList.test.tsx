import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { AppRouting } from 'consts';
import { CharactersList } from './CharactersList';

const pageID = '2';
const queryClient = new QueryClient();

const customRender = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/characters/${pageID}`]}>
        <Routes>
          <Route
            path={AppRouting.CHARACTERS_PAGE}
            element={<CharactersList />}
          />
          <Route
            path={AppRouting.CHARACTER_PAGE}
            element={<>Character Page</>}
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

describe('Character List Page', () => {
  it('Character List Page should fetch data and render links', async () => {
    const { container } = customRender();
    const spin = container.querySelector('.spin');

    expect(spin).toBeInTheDocument();

    await waitFor(() => {
      expect(spin).not.toBeInTheDocument();
    });

    mockAllIsIntersecting(true);

    expect(container.querySelectorAll('a').length).toBe(20);
  });
});
