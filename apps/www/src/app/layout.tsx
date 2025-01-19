import type { Metadata, Viewport } from 'next';
import { clsx } from 'clsx/lite';

import '~/app/globals.css';

import type { PropsWithChildren } from 'react';

import { ThemeLoader } from '~/components/Layout/ThemeLoader';
import { Body } from './_components/body';
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

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html suppressHydrationWarning lang='en'>
      <Body>
        <Providers>
          <div className='' vaul-drawer-wrapper=''>
            {children}
          </div>

          <ThemeLoader />
        </Providers>
      </Body>
    </html>
  );
};

export default RootLayout;
