'use client';

import { Loading } from '@/components';
import { env } from '@/env';
import { ConvexClientProviderProps } from '@/interfaces';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
