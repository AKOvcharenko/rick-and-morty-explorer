import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { character } from 'mocks';
import { AppRouting } from 'consts';
import { Character } from './Character';

const testCharacterId = '1';
const testCharacter = character[testCharacterId].character;
const queryClient = new QueryClient();

const customRender = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/character/${testCharacterId}`]}>
        <Routes>
          <Route path={AppRouting.CHARACTER_PAGE} element={<Character />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

describe('Character Page', () => {
  it('Character Page should render correct html', async () => {
    customRender();
    const spin = document.querySelector('.spin');

    expect(spin).toBeInTheDocument();

    await waitFor(() => {
      expect(spin).not.toBeInTheDocument();
    });

    const h2 = document.querySelector('h2');
    const image = document.querySelector('img');
    const episodeTags = Array.from(
      document.querySelectorAll('.ant-tag-blue')
    ).map(({ textContent }) => textContent);

    expect(image).toBeInTheDocument();
    expect(image?.getAttribute('src')).toBe(testCharacter.image);

    expect(h2).toBeInTheDocument();
    expect(h2?.textContent).toBe(
      `${testCharacter.name} ${testCharacter.status}`
    );

    expect(episodeTags).toStrictEqual(
      testCharacter.episode.map(
        ({ name, episode }: { name: string; episode: string }) =>
          `${name}(${episode})`
      )
    );
  });
});
