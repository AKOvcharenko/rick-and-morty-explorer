import { isNumParametr } from './isNumParametr';

describe('isNumParametr', () => {
  it('isNumParametr should return true when parametr looks like a number', () => {
    expect(isNumParametr('pageId')({ pageId: '1' })).toBe(true);
    expect(isNumParametr('characterId')({ characterId: '94' })).toBe(true);
  });

  it('isNumParametr should return false when parametr does not look like a number', () => {
    expect(isNumParametr('pageId')({ pageId: 'test' })).toBe(false);
    expect(isNumParametr('characterId')({ characterId: 'test' })).toBe(false);
  });

  it('isNumParametr should return false when parametr is not present', () => {
    expect(isNumParametr('pageId')({ characterId: 'test' })).toBe(false);
    expect(isNumParametr('characterId')({ pageId: 'test' })).toBe(false);
  });

  it('isNumParametr should return false when parametr is null or 0', () => {
    expect(isNumParametr('pageId')({ pageId: '0' })).toBe(false);
    expect(isNumParametr('characterId')({ characterId: 'null' })).toBe(false);
  });
});
