'use client';

import { RoomProps } from '@/interfaces';
import { RoomProvider } from '@/liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';

const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
