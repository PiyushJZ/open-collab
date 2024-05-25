'use client';

import { Hint } from '@/components';
import { Button } from '@/components/ui/button';
import { BUTTON_VARIANTS } from '@/constants';
import { useDeleteLayers, useSelectionBounds } from '@/hooks';
import { Color, SelectionToolsProps } from '@/interfaces';
import { useMutation, useSelf } from '@/liveblocks.config';
import { Trash2 } from 'lucide-react';
import { memo } from 'react';
import ColorPicker from './ColorPicker';

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf(me => me.presence.selection);
    const selectionBounds = useSelectionBounds();
    const deleteLayers = useDeleteLayers();

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get('layers');
        setLastUsedColor(fill);

        selection.forEach(layerId => {
          liveLayers.get(layerId)?.set('fill', fill);
        });
      },
      [selection, setLastUsedColor],
    );

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className='absolute flex select-none rounded-xl border bg-white p-3 shadow-sm'
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className='ml-2 flex items-center border-l border-neutral-200 pl-2'>
          <Hint
            label='Delete'
            side='top'
          >
            <Button
              size={'icon'}
              variant={BUTTON_VARIANTS.BOARD}
              onClick={deleteLayers}
            >
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  },
);

SelectionTools.displayName = 'SelectionTools';

export default SelectionTools;
