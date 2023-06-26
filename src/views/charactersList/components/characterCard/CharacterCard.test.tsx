import userEvent from '@testing-library/user-event';
import { render, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, generatePath } from 'react-router-dom';

import { AppRouting, CharacterState } from 'consts';

import { CharacterCard } from './CharacterCard';

const CHARACTER_PAGE = 'CHARACTER_PAGE';
const cardData = {
  id: '1',
  name: 'test name',
  image: 'test_image_src',
  status: CharacterState.Dead,
};

const customRender = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path={AppRouting.ROOT}
          element={<CharacterCard {...cardData} />}
        />
        <Route
          path={AppRouting.CHARACTER_PAGE}
          element={<>{CHARACTER_PAGE}</>}
        />
      </Routes>
    </MemoryRouter>
  );

describe('CharacterCard', () => {
  it('CharacterCard should render correct html', () => {
    const { debug, container } = customRender();
    const link = container.querySelector('a');
    const img = container.querySelector('img');
    const cardHeader = screen.queryByText(cardData.name);

    expect(link?.getAttribute('href')).toBe(
      generatePath(AppRouting.CHARACTER_PAGE, { characterId: cardData.id })
    );
    expect(link?.getAttribute('title')).toBe(`Status is ${cardData.status}`);
    expect(cardHeader).toBeInTheDocument();
    expect(cardHeader).toHaveClass('ant-card-meta-title');
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute('src')).toContain('test_image_src');
  });

  it('link shold navigate to correct page', async () => {
    const { container } = customRender();
    const link = container.querySelector('a');
    act(() => {
      if (link) userEvent.click(link);
    });

    await waitFor(() =>
      expect(screen.getByText(CHARACTER_PAGE)).toBeInTheDocument()
    );
  });
});
