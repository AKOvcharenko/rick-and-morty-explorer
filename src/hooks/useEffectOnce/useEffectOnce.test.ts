import { renderHook } from '@testing-library/react';

import { useEffectOnce } from './useEffectOnce';

describe('useEffectOnce', () => {
  it('useEffectOnce should fire only once', () => {
    let result = 0;
    const { rerender, unmount } = renderHook(() =>
      useEffectOnce(() => {
        result += 1;

        return () => {
          result = -1;
        };
      })
    );

    expect(result).toBe(1);
    rerender();
    expect(result).toBe(1);
    unmount();
    expect(result).toBe(-1);
  });
});
