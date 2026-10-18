import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/** The chrome every documentation layout shares. */
export const baseOptions = (): BaseLayoutProps => ({
  githubUrl: 'https://github.com/kosori/ui',
  nav: { title: 'kosori' },
});
