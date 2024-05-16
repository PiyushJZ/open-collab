'use client';

import { RenameDialog } from '@/components';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <>
      <RenameDialog />
    </>
  ) : (
    <></>
  );
};

export default ModalProvider;
