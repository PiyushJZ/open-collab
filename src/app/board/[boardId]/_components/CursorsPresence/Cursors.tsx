'use client';

import { useOthersConnectionIds } from '@/liveblocks.config';
import Cursor from './Cursor';

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map(connectionId => {
        return (
          <Cursor
            key={connectionId}
            connectionId={connectionId}
          />
        );
      })}
    </>
  );
};

export default Cursors;
