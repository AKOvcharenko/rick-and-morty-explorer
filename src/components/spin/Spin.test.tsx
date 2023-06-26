import { render } from '@testing-library/react';

import { Spin } from './Spin';

describe('Spin', () => {
  it('Spin should be without shadow', () => {
    render(<Spin />);
    expect(document.querySelector('.spin')).toBeInTheDocument();
    expect(document.querySelector('.spin-shadow')).not.toBeInTheDocument();
    expect(document.querySelector('.anticon-spin')).toBeInTheDocument();
  });

  it('Spin should be with shadow', () => {
    render(<Spin shadow />);
    expect(document.querySelector('.spin-shadow')).toBeInTheDocument();
  });
});
