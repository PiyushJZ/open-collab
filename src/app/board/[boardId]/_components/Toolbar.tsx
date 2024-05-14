import { CanvasMode, LayerType } from '@/constants';
import { ToolbarProps } from '@/interfaces';
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from 'lucide-react';
import ToolButton from './ToolButton';

const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarProps) => {
  return (
    <div className='absolute left-2 top-[50%] flex -translate-y-[50%] flex-col gap-y-4'>
      <div className='flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md'>
        <ToolButton
          label='Select'
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.NONE })}
          isActive={
            canvasState.mode === CanvasMode.NONE ||
            canvasState.mode === CanvasMode.TRANSLATING ||
            canvasState.mode === CanvasMode.SELECTION_NET ||
            canvasState.mode === CanvasMode.PRESSING ||
            canvasState.mode === CanvasMode.RESIZING
          }
          isDisabled={false}
        />
        <ToolButton
          label='Text'
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.INSERTING,
              layerType: LayerType.TEXT,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.INSERTING &&
            canvasState.layerType === LayerType.TEXT
          }
          isDisabled={false}
        />
        <ToolButton
          label='Sticky Note'
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.INSERTING,
              layerType: LayerType.NOTE,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.INSERTING &&
            canvasState.layerType === LayerType.NOTE
          }
          isDisabled={false}
        />
        <ToolButton
          label='Rectangle'
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.INSERTING,
              layerType: LayerType.RECTANGLE,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.INSERTING &&
            canvasState.layerType === LayerType.RECTANGLE
          }
          isDisabled={false}
        />
        <ToolButton
          label='Ellipse'
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.INSERTING,
              layerType: LayerType.ELLIPSE,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.INSERTING &&
            canvasState.layerType === LayerType.ELLIPSE
          }
          isDisabled={false}
        />
        <ToolButton
          label='Pen'
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.PENCIL,
            })
          }
          isActive={canvasState.mode === CanvasMode.PENCIL}
          isDisabled={false}
        />
      </div>
      <div className='flex flex-col items-center rounded-md bg-white p-1.5 shadow-md'>
        <ToolButton
          label='Undo'
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label='Redo'
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className='absolute left-2 top-[50%] flex h-[360px] w-[52px] -translate-y-[50%] flex-col gap-y-4 bg-white shadow-md' />
  );
};

export default Toolbar;
