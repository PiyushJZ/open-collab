'use client';

import { ColorButtonProps } from '@/interfaces';
import { colorToCss } from '@/lib/utils';

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className='hover: flex h-8 w-8 items-center justify-center opacity-75 transition'
      onClick={() => onClick(color)}
    >
      <div
        className='h-8 w-8 rounded-md border border-neutral-300'
        style={{ background: colorToCss(color) }}
      ></div>
    </button>
  );
};

export default ColorButton;
