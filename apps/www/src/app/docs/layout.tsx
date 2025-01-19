import type { PropsWithChildren } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

import { docsOptions } from '~/config/layout';
import { ThemeNav } from '../_components/theme-nav';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DocsLayout {...docsOptions}>
      {children}
      <ThemeNav />
    </DocsLayout>
  );
}
