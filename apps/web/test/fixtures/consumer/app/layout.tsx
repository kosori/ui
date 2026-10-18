import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <body>{children}</body>
  </html>
);

export default Layout;
