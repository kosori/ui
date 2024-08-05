import { type HomeLayoutProps } from 'fumadocs-ui/home-layout';
import { type DocsLayoutProps } from 'fumadocs-ui/layout';

import { docs } from '~/app/source';

// shared configuration
export const baseOptions: HomeLayoutProps = {
  nav: {
    title: 'kosori/ui',
  },
  githubUrl: 'https://github.com/kosori/ui',
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: docs.pageTree,
};
