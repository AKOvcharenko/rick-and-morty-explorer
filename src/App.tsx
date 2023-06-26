import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Route,
  Routes,
  Navigate,
  generatePath,
  BrowserRouter,
} from 'react-router-dom';

import { isNumParametr } from 'common';
import { RouteParamChecker } from 'components';
import { AppRouting, PAGE_ID, CHARACTER_ID } from 'consts';
import { CharactersList, Character, NotFound } from 'views';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  return (
    <div className="app-container">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path={AppRouting.CHARACTERS_PAGE}
              element={
                <RouteParamChecker checker={isNumParametr(PAGE_ID)}>
                  <CharactersList />
                </RouteParamChecker>
              }
            />
            <Route
              path={AppRouting.CHARACTER_PAGE}
              element={
                <RouteParamChecker checker={isNumParametr(CHARACTER_ID)}>
                  <Character />
                </RouteParamChecker>
              }
            />
            <Route
              path={AppRouting.ROOT}
              element={
                <Navigate
                  to={generatePath(AppRouting.CHARACTERS_PAGE, {
                    [PAGE_ID]: '1',
                  })}
                  replace={true}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
