import { useQuery } from '@tanstack/react-query';
import { request, gql, Variables } from 'graphql-request';

import { CharacterT } from 'models/character';
import { BASE_API_URL } from 'consts';

const charactersListGraphqlQuery = gql`
  query Character($characterId: ID!) {
    character(id: $characterId) {
      episode {
        episode
        name
        id
      }
      gender
      image
      location {
        name
      }
      status
      species
      name
    }
  }
`;

export const useGetCharacter = (params: Variables) => {
  return useQuery({
    queryKey: ['character', params.characterId],
    queryFn: () =>
      request<{ character: CharacterT }>(
        BASE_API_URL,
        charactersListGraphqlQuery,
        params
      ).then(({ character }) => {
        return character;
      }),
    cacheTime: 0,
  });
};
