'use client';

import { Room } from '@/components';
import { BoardIdPageProps } from '@/interfaces';
import { Canvas, Loading } from './_components';

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room
      roomId={params.boardId}
      fallback={<Loading />}
    >
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
