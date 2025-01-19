'use client';

import { useParams } from 'next/navigation';
import { clsx } from 'clsx/lite';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { defaultConfig } from '~/config/theme';

export function useMode(): string | undefined {
  const { slug } = useParams();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}

export const Body = ({ children }: React.PropsWithChildren) => {
  const mode = useMode();

  return (
    <body
      className={clsx(
        mode,
        'min-h-screen font-sans antialiased',
        GeistSans.variable,
        GeistMono.variable,
      )}
      data-error-color={defaultConfig['error-color']}
      data-grey-color={defaultConfig['grey-color']}
      data-info-color={defaultConfig['info-color']}
      data-primary-color={defaultConfig['primary-color']}
      data-radius={defaultConfig.radius}
      data-success-color={defaultConfig['success-color']}
      data-warning-color={defaultConfig['warning-color']}
      kosori-theme-wrapper=''
    >
      {children}
    </body>
  );
};
