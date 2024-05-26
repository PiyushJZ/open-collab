'use client';

import { memo } from 'react';
import Cursors from './Cursors';
import Drafts from './Drafts';

const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = 'CursorsPresence';

export default CursorsPresence;
