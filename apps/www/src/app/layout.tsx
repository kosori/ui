import type { Metadata, Viewport } from 'next';
import { clsx } from 'clsx/lite';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { defaultConfig } from '~/config/theme';

import '~/app/globals.css';

import { ThemeLoader } from '~/components/Layout/ThemeLoader';
import { ThemeNav } from '~/components/Layout/ThemeNav';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'kosori/ui',
  description: 'Build high quality and accessible apps in a short time.',
  openGraph: {
    title: 'kosori/ui',
    description: 'Build high quality and accessible apps in a short time.',
    url: 'https://ui.codingcodax.dev',
    siteName: 'kosori/ui',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@codingcodax',
    creator: '@codingcodax',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body
        className={clsx(
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
        <Providers>
          <div
            className='min-h-screen bg-grey-base text-grey-text'
            vaul-drawer-wrapper=''
          >
            {props.children}
          </div>

          <ThemeNav />
          <ThemeLoader />
        </Providers>
      </body>
    </html>
  );
}
