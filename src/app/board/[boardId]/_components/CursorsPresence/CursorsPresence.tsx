'use client';

import { memo } from 'react';
import Cursors from './Cursors';

const CursorsPresence = memo(() => {
  return (
    <>
      {/* TODO: Draft pencil */}
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = 'CursorsPresence';

export default CursorsPresence;
