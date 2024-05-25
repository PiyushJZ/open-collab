'use client';

import { ColorPickerProps } from '@/interfaces';
import ColorButton from './ColorButton';

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className='mr-2 flex max-w-[164px] flex-wrap items-center gap-2 border-r border-neutral-200 pr-2'>
      <ColorButton
        onClick={onChange}
        color={{ r: 243, g: 82, b: 85 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 249, b: 177 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 68, g: 202, b: 99 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 39, g: 142, b: 237 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 155, g: 105, b: 245 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 252, g: 142, b: 41 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 0, g: 0, b: 0 }}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 255, b: 255 }}
      />
    </div>
  );
};

export default ColorPicker;
