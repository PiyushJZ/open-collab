/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { LayerTypes, Side } from '@/constants';
import { useSelectionBounds } from '@/hooks';
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

    const bounds = useSelectionBounds();

    return !bounds ? (
      <></>
    ) : (
      <>
        <rect
          className='pointer-events-none fill-transparent stroke-blue-500 stroke-1'
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
          }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            <rect
              className='fill-white stroke-blue-500 stroke-1'
              style={{
                cursor: 'nwse-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.TOP + Side.LEFT, bounds);
              }}
            />
            <rect
              className='fill-white stroke-blue-500 stroke-1'
              style={{
                cursor: 'ns-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                  ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.TOP, bounds);
              }}
            />
            <rect
              className='fill-white stroke-blue-500 stroke-1'
              style={{
                cursor: 'nesw-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                  ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.TOP + Side.RIGHT, bounds);
              }}
            />
            <rect
              className='fill-white stroke-blue-500 stroke-1'
              style={{
                cursor: 'ew-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                  ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px,
                  ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.RIGHT, bounds);
              }}
            />
            <rect
              className='fill-white stroke-blue-500 stroke-1'
              style={{
                cursor: 'nwse-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                  ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px,
                  ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.BOTTOM + Side.RIGHT, bounds);
              }}
            />
            <rect
              className='fill-white stroke-blue-500 stroke-1'
              style={{
                cursor: 'ns-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                  ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                  ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.BOTTOM, bounds);
              }}
            />
            <rect
              className='fill-white stroke-blue-500 stroke-1'
              style={{
                cursor: 'nesw-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.BOTTOM + Side.LEFT, bounds);
              }}
            />
            <rect
              className='fill-white stroke-blue-500 stroke-1'
              style={{
                cursor: 'ew-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px, 
                  ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
              }}
              x={0}
              y={0}
              onPointerDown={e => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.LEFT, bounds);
              }}
            />
          </>
        )}
      </>
    );
  },
);

SelectionBox.displayName = 'SelectionBox';

export default SelectionBox;
