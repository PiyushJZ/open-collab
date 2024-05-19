/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { LayerTypes } from '@/constants';
import { SelectionBoxProps } from '@/interfaces';
import { useSelf, useStorage } from '@/liveblocks.config';
import { memo } from 'react';

const HANDLE_WIDTH = 8;

const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf(me =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null,
    );
    const isShowingHandles = useStorage(
      root =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerTypes.PATH,
    );

    return <div></div>;
  },
);

SelectionBox.displayName = 'SelectionBox';

export default SelectionBox;
