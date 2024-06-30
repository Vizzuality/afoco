'use client';

import { PropsWithChildren, useState } from 'react';

import { MapProvider } from 'react-map-gl';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';

import { TooltipProvider } from '@/components/ui/tooltip';

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MapProvider>
        <Provider>
          <TooltipProvider>{children}</TooltipProvider>
        </Provider>
      </MapProvider>
    </QueryClientProvider>
  );
}
