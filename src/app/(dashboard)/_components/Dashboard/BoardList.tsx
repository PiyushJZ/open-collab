'use client';

import { BoardListProps } from '@/interfaces';
import React from 'react';
import EmptyBoard from './EmptyBoards';
import EmptyFavorites from './EmptyFavorites';
import EmptySearch from './EmptySearch';

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = [];

  return (
    <>
      {!data.length && query.search && <EmptySearch />}
      {!data.length && query.favorites && <EmptyFavorites />}
      {!data.length && !query.search && !query.favorites && <EmptyBoard />}
    </>
  );
};

export default BoardList;
