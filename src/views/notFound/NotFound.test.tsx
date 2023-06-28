import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AppRouting } from 'consts';
import { NotFound } from './NotFound';

const customRender = () =>
  render(
    <MemoryRouter initialEntries={['/404']}>
      <Routes>
        <Route path={AppRouting.ROOT} element={<>Root</>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );

describe('Not Found Page', () => {
  it('Not Found Page should render correct html', () => {
    customRender();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, the page you visited does not exist.')
    ).toBeInTheDocument();
    expect(screen.getByText('Back Home')).toBeInTheDocument();
  });

  it('Back button should lead to root', async () => {
    const { container } = customRender();
    const link = container.querySelector('a');
    act(() => {
      if (link) userEvent.click(link);
    });

    const element = await screen.findByText('Root');
    expect(element).toBeInTheDocument();
  });
});
