import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import type { HomeLayoutProps } from 'fumadocs-ui/layouts/home';
import { CodeSandboxLogoIcon } from '@radix-ui/react-icons';
import { AppWindowMacIcon, LayoutTemplateIcon } from 'lucide-react';

import { source } from '~/app/source';
import { Logo } from '~/components/Layout/Logo';
import { NavModes } from '~/components/Layout/NavModes';

// shared configuration
export const baseOptions: HomeLayoutProps = {
  githubUrl: 'https://github.com/kosori/ui',
  nav: {
    enableSearch: false,
    transparentMode: 'top',
    title: <Logo />,
    children: <NavModes />,
  },
  links: [
    {
      icon: <CodeSandboxLogoIcon />,
      text: 'Examples',
      url: '/examples',
    },
    {
      icon: <AppWindowMacIcon />,
      text: 'Templates',
      url: '/templates',
    },
    {
      icon: <LayoutTemplateIcon />,
      text: 'Showcase',
      url: '/showcase',
    },
  ],
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  nav: {
    ...baseOptions.nav,
    children: undefined,
  },
};
