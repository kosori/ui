import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layout';

import { ThemeNav } from '~/components/Layout/ThemeNav';
import { docsOptions } from '~/config/layout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...docsOptions}>
      {children}
      <ThemeNav />
    </DocsLayout>
  );
}
