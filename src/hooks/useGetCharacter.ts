import { useQuery } from '@tanstack/react-query';
import { request, gql, Variables } from 'graphql-request';

import { BASE_API_URL } from 'consts';

const charactersListGraphqlQuery = gql`
  query ExampleQuery($characterId: ID!) {
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
    queryKey: ['character', params.id],
    queryFn: () =>
      request(BASE_API_URL, charactersListGraphqlQuery, params).then(
        ({ character }: any) => {
          return character;
        }
      ),
    cacheTime: 0,
  });
};
