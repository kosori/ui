import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layout';

import { docsOptions } from '~/config/layout';

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
