import type { PropsWithChildren } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import { Provider as JotaiProvider } from 'jotai';

import { Toaster as SonnerToaster } from '@kosori/ui/sonner';
import { Toaster as RadixToaster } from '@kosori/ui/toast';
import { TooltipProvider } from '@kosori/ui/tooltip';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <JotaiProvider>
        <RootProvider
          theme={{
            enableSystem: true,
            attribute: 'class',
            defaultTheme: 'system',
            disableTransitionOnChange: true,
          }}
        >
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </RootProvider>
        <RadixToaster />
        <SonnerToaster />
      </JotaiProvider>
    </>
  );
};
