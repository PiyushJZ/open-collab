'use client';

import { Hint } from '@/components';
import { Button } from '@/components/ui/button';
import { BUTTON_VARIANTS } from '@/constants';
import { useDeleteLayers, useSelectionBounds } from '@/hooks';
import { Color, SelectionToolsProps } from '@/interfaces';
import { useMutation, useSelf } from '@/liveblocks.config';
import { BringToFront, SendToBack, Trash2 } from 'lucide-react';
import { memo } from 'react';
import ColorPicker from './ColorPicker';

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf(me => me.presence.selection);
    const selectionBounds = useSelectionBounds();
    const deleteLayers = useDeleteLayers();

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get('layerIds');
        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();
        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection],
    );

    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get('layerIds');
        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();
        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i),
          );
        }
      },
      [selection],
    );

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
        <div className='flex flex-col gap-y-0.5'>
          <Hint
            label='Bring to front'
            side='top'
          >
            <Button
              variant={BUTTON_VARIANTS.BOARD}
              size={'icon'}
              onClick={moveToFront}
            >
              <BringToFront />
            </Button>
          </Hint>
          <Hint
            label='Send to back'
            side='bottom'
          >
            <Button
              variant={BUTTON_VARIANTS.BOARD}
              size={'icon'}
              onClick={moveToBack}
            >
              <SendToBack />
            </Button>
          </Hint>
        </div>
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
