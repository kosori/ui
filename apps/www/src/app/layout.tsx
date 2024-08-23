import type { Metadata, Viewport } from 'next';
import { clsx } from 'clsx/lite';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import '~/app/globals.css';

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
        data-error-color='red'
        data-grey-color='mauve'
        data-info-color='blue'
        data-primary-color='violet'
        data-radius='medium'
        data-success-color='green'
        data-warning-color='yellow'
      >
        <Providers>
          <div className='bg-grey-base text-grey-text' vaul-drawer-wrapper=''>
            {props.children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
