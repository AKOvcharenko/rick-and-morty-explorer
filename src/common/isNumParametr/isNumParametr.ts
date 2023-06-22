import { AppRoutingParams } from 'consts';

export const isNumParametr =
  (paramName: keyof AppRoutingParams) => (parametrs: AppRoutingParams) =>
    Number(parametrs[paramName]) > 0;
