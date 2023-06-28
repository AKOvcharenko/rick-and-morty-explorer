import { debounce } from 'lodash-es';
import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams, useNavigate, generatePath } from 'react-router-dom';

import { Spin } from 'components';
import { AppRouting } from 'consts';
import { elementIsVisibleInViewport } from 'common';
import { useGetCharacters, useEffectOnce } from 'hooks';

import { CharacterCard } from './components';

import './CharactersList.scss';

export const CharactersList: FC = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useGetCharacters({ pageId });

  const { ref: refNext, inView: inViewNext } = useInView();
  const { ref: refPrev, inView: inViewPrev } = useInView();

  useEffect(() => {
    if (inViewPrev) {
      fetchPreviousPage();
    }
  }, [inViewPrev, fetchPreviousPage]);

  useEffect(() => {
    if (inViewNext) {
      fetchNextPage();
    }
  }, [inViewNext, fetchNextPage]);

  useEffect(() => {
    if (!isFetchingPreviousPage && inViewPrev) {
      document.querySelectorAll('.characters-part')[1]?.scrollIntoView();
    }
  }, [isFetchingPreviousPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffectOnce(() => {
    document.querySelector(`[data-page="${pageId}"]`)?.scrollIntoView();

    const onScroll: EventListener = debounce(() => {
      const lastVisiblePageGrid = Array.from(
        document.querySelectorAll('.characters-part')
      )
        .reverse()
        .find((element) => {
          return elementIsVisibleInViewport(element);
        });

      const activePage = lastVisiblePageGrid?.getAttribute('data-page');
      if (activePage) {
        navigate(
          generatePath(AppRouting.CHARACTERS_PAGE, { pageId: activePage }),
          { replace: true }
        );
      }
    }, 200);

    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  });

  return (
    <div className="page characters-page">
      {isFetching && <Spin shadow />}
      {data?.pages.length && hasPreviousPage ? (
        <div ref={refPrev} className="infinity-loader" />
      ) : null}
      {data?.pages.map(({ data: pageData, pageId: page }) => {
        return (
          <div key={page} className="characters-part" data-page={page}>
            {pageData.map(CharacterCard)}
          </div>
        );
      })}
      {data?.pages.length && hasNextPage ? (
        <div ref={refNext} className="infinity-loader" />
      ) : null}
    </div>
  );
};
