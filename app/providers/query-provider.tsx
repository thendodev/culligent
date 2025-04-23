'use client';

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from './query-client';
import { useState } from 'react';

type TQueryClientProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: TQueryClientProviderProps) {
  const [queryClient] = useState(getQueryClient());
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
