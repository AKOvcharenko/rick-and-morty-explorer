import { graphql } from 'msw';

import { characters } from './characters';
import { character } from './character';

export const handlers = [
  graphql.query('Characters', (req, res, ctx) => {
    const { page } = req.variables;
    return res(ctx.data(characters[page]));
  }),
  graphql.query('Character', (req, res, ctx) => {
    const { characterId } = req.variables;
    return res(ctx.data(character[characterId]));
  }),
];
