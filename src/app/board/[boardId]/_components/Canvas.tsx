'use client';

import { CanvasProps } from '@/interfaces';
import { useSelf } from '@/liveblocks.config';
import Info from './Info';
import Participants from './Participants';
import Toolbar from './Toolbar';

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf(me => me.info);
  return (
    <main className='relative h-screen w-screen touch-none bg-neutral-100'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
