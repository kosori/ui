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
  title: 'kōsori',
  description: 'Build high quality and accessible apps in a short time.',
  icons: [
    { rel: 'icon', url: '/favicons/favicon.ico' },
    {
      rel: 'apple-touch-icon',
      url: '/favicons/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      url: '/favicons/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicons/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    { rel: 'manifest', url: '/favicons/site.webmanifest' },
    {
      rel: 'mask-icon',
      url: '/favicons/safari-pinned-tab.svg',
      color: '#000000',
    },
  ],
  applicationName: 'kōsori',
  openGraph: {
    title: 'kōsori',
    description: 'Build high quality and accessible apps in a short time.',
    url: 'https://kosori.codingcodax.dev',
    siteName: 'kosori',
    images: [{ url: 'https://kosori.codingcodax.dev/og.png' }],
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
