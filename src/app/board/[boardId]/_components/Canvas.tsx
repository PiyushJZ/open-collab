'use client';

import { CanvasProps } from '@/interfaces';
import Info from './Info';
import Participants from './Participants';
import Toolbar from './Toolbar';

const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className='relative h-screen w-screen touch-none bg-neutral-100'>
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
