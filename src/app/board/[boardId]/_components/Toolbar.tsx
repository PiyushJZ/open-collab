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

const Toolbar = () => {
  return (
    <div className='absolute left-2 top-[50%] flex -translate-y-[50%] flex-col gap-y-4'>
      <div className='flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md'>
        <ToolButton
          label='Select'
          icon={MousePointer2}
          onClick={() => {}}
          isActive={false}
          isDisabled={false}
        />
        <ToolButton
          label='Text'
          icon={Type}
          onClick={() => {}}
          isActive={false}
          isDisabled={false}
        />
        <ToolButton
          label='Sticky Note'
          icon={StickyNote}
          onClick={() => {}}
          isActive={false}
          isDisabled={false}
        />
        <ToolButton
          label='Rectangle'
          icon={Square}
          onClick={() => {}}
          isActive={false}
          isDisabled={false}
        />
        <ToolButton
          label='Ellipse'
          icon={Circle}
          onClick={() => {}}
          isActive={false}
          isDisabled={false}
        />
        <ToolButton
          label='Pen'
          icon={Pencil}
          onClick={() => {}}
          isActive={false}
          isDisabled={false}
        />
      </div>
      <div className='flex flex-col items-center rounded-md bg-white p-1.5 shadow-md'>
        <ToolButton
          label='Undo'
          icon={Undo2}
          onClick={() => {}}
          isActive={false}
          isDisabled={true}
        />
        <ToolButton
          label='Redo'
          icon={Redo2}
          onClick={() => {}}
          isActive={false}
          isDisabled={true}
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
