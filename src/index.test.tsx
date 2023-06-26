import 'react-intersection-observer/test-utils';
import { waitFor, act } from '@testing-library/react';

describe('index', () => {
  it('renders without crashing', async () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    act(() => {
      require('./index.tsx');
    });

    await waitFor(
      () => {
        expect(document.querySelector('.app-container')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    document.getElementById('root')?.remove();
  });
});
