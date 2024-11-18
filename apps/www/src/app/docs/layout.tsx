import type { PropsWithChildren } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

import { ThemeNav } from '~/components/Layout/ThemeNav';
import { docsOptions } from '~/config/layout';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DocsLayout {...docsOptions}>
      {children}
      <ThemeNav />
    </DocsLayout>
  );
}
