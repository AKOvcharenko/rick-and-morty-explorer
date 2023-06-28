import { get } from 'lodash';
import { FC, ReactElement } from 'react';
import { waitFor, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { character } from 'mocks';
import { useGetCharacter } from './useGetCharacter';

const queryClient = new QueryClient();
const wrapper: FC<{ children: ReactElement }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetCharacter', () => {
  it('should fetch data correctly', async () => {
    let id = 1;
    const { result, rerender } = renderHook(
      ({ characterId }) => {
        return useGetCharacter({ characterId });
      },
      {
        initialProps: { characterId: id },
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });

    let response = get(character, [id, 'character']);
    expect(result.current.data).toStrictEqual(response);

    id += 1;
    rerender({ characterId: id });

    await waitFor(() => {
      expect(result.current.isFetching).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    response = get(character, [id, 'character']);
    expect(result.current.data).toStrictEqual(response);
  });
});
