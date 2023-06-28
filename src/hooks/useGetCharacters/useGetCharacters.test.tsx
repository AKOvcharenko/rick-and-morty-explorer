import { get } from 'lodash';
import { FC, ReactElement } from 'react';
import { waitFor, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { characters } from 'mocks';
import { CharactersT } from 'models/characters';
import { useGetCharacters } from './useGetCharacters';

const queryClient = new QueryClient();
const wrapper: FC<{ children: ReactElement }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetCharacters', () => {
  it('should fetch data correctly', async () => {
    let pageId = 1;
    let fetchedPages: {
      pageId: number;
      data: CharactersT;
      nextPageId: string;
      prevPageId: string;
    }[] = [];
    const { result } = renderHook(() => useGetCharacters({ pageId }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.data?.pages.length).toBe(pageId);
      const response = get(characters, [pageId, 'characters']);
      fetchedPages.push({
        pageId,
        data: response.results,
        nextPageId: response.info.next,
        prevPageId: response.info.prev,
      });
    });

    expect(result.current.data?.pages).toStrictEqual(fetchedPages);

    await result.current.fetchNextPage();
    pageId += 1;

    await waitFor(() => {
      expect(result.current.data?.pages.length).toBe(pageId);
      const response = get(characters, [pageId, 'characters']);
      fetchedPages.push({
        data: response.results,
        pageId,
        nextPageId: response.info.next,
        prevPageId: response.info.prev,
      });
    });
    expect(result.current.data?.pages).toStrictEqual(fetchedPages);
  });
});
