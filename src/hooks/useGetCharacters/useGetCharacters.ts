import { get } from 'lodash-es';
import { request, gql, Variables } from 'graphql-request';
import { useInfiniteQuery } from '@tanstack/react-query';

import { BASE_API_URL } from 'consts';

const charactersListGraphqlQuery = gql`
  query Characters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        status
      }
      info {
        next
        prev
      }
    }
  }
`;

export const useGetCharacters = ({ pageId }: Variables) => {
  return useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: ({ pageParam }) =>
      request(BASE_API_URL, charactersListGraphqlQuery, {
        page: pageParam || Number(pageId),
      }).then((data) => {
        return {
          data: get(data, ['characters', 'results']),
          pageId: get(data, ['characters', 'info', 'prev']) + 1,
          nextPageId: get(data, ['characters', 'info', 'next']),
          prevPageId: get(data, ['characters', 'info', 'prev']),
        };
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageId;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.prevPageId;
    },
    refetchOnMount: false,
  });
};
