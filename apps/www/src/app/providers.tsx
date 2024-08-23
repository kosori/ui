import { RootProvider } from 'fumadocs-ui/provider';

import { Toaster as SonnerToaster } from '@kosori/ui/sonner';
import { Toaster as RadixToaster } from '@kosori/ui/toast';

type Props = { children: React.ReactNode };

export const Providers = ({ children }: Props) => {
  return (
    <>
      <RootProvider
        theme={{
          enableSystem: true,
          attribute: 'class',
          defaultTheme: 'system',
          disableTransitionOnChange: true,
        }}
      >
        {children}
      </RootProvider>
      <RadixToaster />
      <SonnerToaster />
    </>
  );
};
