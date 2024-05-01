'use client';

import { Loader } from '@/components';
import { api } from '@/convex/_generated/api';
import { BoardListProps } from '@/interfaces';
import { useQuery } from 'convex/react';
import React from 'react';
import BoardCard from './BoardCard';
import EmptyBoard from './EmptyBoards';
import EmptyFavorites from './EmptyFavorites';
import EmptySearch from './EmptySearch';

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId });

  return data === undefined ? (
    <Loader />
  ) : (
    <>
      {!data.length && query.search ? <EmptySearch /> : <></>}
      {!data.length && query.favorites ? <EmptyFavorites /> : <></>}
      {!data.length && !query.search ? (
        !query.favorites && <EmptyBoard />
      ) : (
        <></>
      )}
      {data.length ? (
        <div>
          <h2 className='text-3xl'>
            {query.favorites ? 'Favorites Boards' : 'Team Boards'}
          </h2>
          <div className='mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {data.map(board => {
              return (
                <BoardCard
                  key={board._id}
                  id={board._id}
                  title={board.title}
                  imageUrl={board.imageUrl}
                  authorId={board.authorId}
                  authorName={board.authorName}
                  createdAt={board._creationTime}
                  orgId={board.orgId}
                  isFavorite={false}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BoardList;
