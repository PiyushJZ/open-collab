'use client';

import { CursorProps } from '@/interfaces';
import { connectionIdToColor } from '@/lib/utils';
import { useOther } from '@/liveblocks.config';
import { MousePointer2 } from 'lucide-react';
import { memo } from 'react';

const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, user => user?.info);
  const cursor = useOther(connectionId, user => user.presence.cursor);
  const name = info.name ?? 'Teammate';

  return !cursor ? (
    <></>
  ) : (
    <>
      <foreignObject
        style={{
          transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
        }}
        height={50}
        width={name.length * 10 + 24}
        className='relative drop-shadow-md'
      >
        <MousePointer2
          className='h-5 w-5'
          style={{
            fill: connectionIdToColor(connectionId),
            color: connectionIdToColor(connectionId),
          }}
        />
        <div
          className='absolute left-5 rounded-md px-1.5 py-0.5 text-xs font-semibold text-white'
          style={{
            backgroundColor: connectionIdToColor(connectionId),
          }}
        >
          {name}
        </div>
      </foreignObject>
    </>
  );
});

Cursor.displayName = 'Cursor';

export default Cursor;
