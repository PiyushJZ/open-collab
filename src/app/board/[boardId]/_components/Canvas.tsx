'use client';

import { CanvasMode } from '@/constants';
import { CanvasProps, CanvasState } from '@/interfaces';
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useSelf,
} from '@/liveblocks.config';
import { useState } from 'react';
import Info from './Info';
import Participants from './Participants';
import Toolbar from './Toolbar';

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.NONE,
  });
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const history = useHistory();

  const info = useSelf(me => me.info);
  return (
    <main className='relative h-screen w-screen touch-none bg-neutral-100'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
};

export default Canvas;
