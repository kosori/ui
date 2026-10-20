import { cn } from 'cn';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AnchoredToastProvider, Toaster } from '@/components/ui/toast';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  description: 'Copy-paste React components built on Base UI.',
  title: 'kosori',
};

const Layout = ({ children }: LayoutProps<'/'>) => (
  <html
    className={cn(geistSans.variable, geistMono.variable)}
    lang='en'
    suppressHydrationWarning
  >
    <body>
      <Toaster>
        <AnchoredToastProvider>
          <RootProvider>{children}</RootProvider>
        </AnchoredToastProvider>
      </Toaster>
    </body>
  </html>
);

export default Layout;
