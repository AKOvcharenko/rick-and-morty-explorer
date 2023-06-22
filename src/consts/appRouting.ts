export const PAGE_ID = 'pageId';
export const CHARACTER_ID = 'characterId';

export type AppRoutingParams = {
  pageId?: string;
  characterId?: string;
};

export enum AppRouting {
  ROOT = '/',
  CHARACTERS_PAGE = '/characters/:pageId',
  CHARACTER_PAGE = '/character/:characterId',
  NOT_FOUND = '/404',
}
