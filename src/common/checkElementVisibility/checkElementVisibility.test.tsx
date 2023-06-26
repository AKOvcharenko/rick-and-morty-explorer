import { render, waitFor, screen } from '@testing-library/react';

const customRender = () =>
  render(
    <div>
      <p>test</p>
    </div>
  );
import { elementIsVisibleInViewport } from './checkElementVisibility';

const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight'
) as PropertyDescriptor;
const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth'
) as PropertyDescriptor;

const originalOffsetParent = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetParent'
) as PropertyDescriptor;

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: 500,
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: 500,
  });
});

afterAll(() => {
  Object.defineProperty(
    HTMLElement.prototype,
    'offsetHeight',
    originalOffsetHeight
  );
  Object.defineProperty(
    HTMLElement.prototype,
    'offsetWidth',
    originalOffsetWidth
  );
  Object.defineProperty(
    HTMLElement.prototype,
    'offsetParent',
    originalOffsetParent
  );
});

describe('isNumParametr', () => {
  it('should return true when element visible', async () => {
    customRender();
    expect(elementIsVisibleInViewport(screen.getByText('test'))).toBe(true);
  });

  it('should return false when element invisible', async () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      configurable: true,
      value: 3000,
    });
    customRender();
    expect(elementIsVisibleInViewport(screen.getByText('test'))).toBe(false);
  });
});
