import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { isNumParametr } from 'common';
import { AppRouting, PAGE_ID, CHARACTER_ID } from 'consts';

import { RouteParamChecker } from './RouteParamChecker';

const NOT_FOUND_PAGE = 'NOT_FOUND_PAGE';
const CHARACTER_PAGE = 'CHARACTER_PAGE';
const CHARACTERS_LIST_PAGE = 'CHARACTERS_LIST_PAGE';

const customRender = (initialEntries: string) =>
  render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <Routes>
        <Route
          path={AppRouting.CHARACTERS_PAGE}
          element={
            <RouteParamChecker checker={isNumParametr(PAGE_ID)}>
              <>{CHARACTERS_LIST_PAGE}</>
            </RouteParamChecker>
          }
        />
        <Route
          path={AppRouting.CHARACTER_PAGE}
          element={
            <RouteParamChecker checker={isNumParametr(CHARACTER_ID)}>
              <>{CHARACTER_PAGE}</>
            </RouteParamChecker>
          }
        />
        <Route path="*" element={<>{NOT_FOUND_PAGE}</>} />
      </Routes>
    </MemoryRouter>
  );

describe('RouteParamChecker', () => {
  it('RouteParamChecker should render component when PAGE_ID matches', () => {
    customRender('/characters/1');
    expect(screen.queryByText(CHARACTERS_LIST_PAGE)).toBeInTheDocument();
  });

  it('RouteParamChecker should render component when CHARACTER_ID matches', () => {
    customRender('/character/1');
    expect(screen.queryByText(CHARACTER_PAGE)).toBeInTheDocument();
  });

  it('RouteParamChecker should make redirect to NOT_FOUND_PAGE when CHARACTER_ID do match', () => {
    customRender('/character/asd');
    expect(screen.queryByText(CHARACTER_PAGE)).toBeNull();
    expect(screen.queryByText(NOT_FOUND_PAGE)).toBeInTheDocument();
  });

  it('RouteParamChecker should make redirect to NOT_FOUND_PAGE when PAGE_ID do match', () => {
    customRender('/characters/asd');
    expect(screen.queryByText(CHARACTERS_LIST_PAGE)).toBeNull();
    expect(screen.queryByText(NOT_FOUND_PAGE)).toBeInTheDocument();
  });
});
