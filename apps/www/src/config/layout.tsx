import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import type { HomeLayoutProps } from 'fumadocs-ui/layouts/home';
import { CodeSandboxLogoIcon } from '@radix-ui/react-icons';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { AppWindowMacIcon, LayoutTemplateIcon } from 'lucide-react';

import { source } from '~/app/source';
import { Logo } from '~/components/Layout/Logo';
import { NavModes } from '~/components/Layout/NavModes';
import { modes } from '~/config/modes';

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
    enableSearch: true,
    children: undefined,
  },
  sidebar: {
    defaultOpenLevel: 0,
    banner: (
      <RootToggle
        options={modes.map((mode) => ({
          url: `/docs/${mode.param}`,
          icon: (
            <div className='flex items-center justify-center rounded-md bg-gradient-to-t from-grey-line to-grey-bg-subtle'>
              <mode.icon className='size-8 shrink-0 rounded-md p-1.5' />
            </div>
          ),
          title: mode.name,
          description: mode.description,
        }))}
      />
    ),
  },
};
