import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import type { HomeLayoutProps } from 'fumadocs-ui/layouts/home';
import { CodeSandboxLogoIcon } from '@radix-ui/react-icons';
import { AppWindowMacIcon, LayoutTemplateIcon } from 'lucide-react';

import { Logo } from '~/app/_components/logo';
import { source } from '~/app/source';

// shared configuration
export const baseOptions: HomeLayoutProps = {
  githubUrl: 'https://github.com/kosori/ui',
  nav: {
    transparentMode: 'top',
    title: <Logo />,
  },
  links: [
    {
      text: 'Examples',
      icon: <CodeSandboxLogoIcon />,
      url: '/examples',
      active: 'url',
    },
    {
      icon: <AppWindowMacIcon />,
      text: 'Templates',
      url: '/templates',
      active: 'url',
    },
    {
      icon: <LayoutTemplateIcon />,
      text: 'Showcase',
      url: '/showcase',
      active: 'url',
    },
  ],
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  nav: {
    ...baseOptions.nav,
  },
  sidebar: {
    tabs: {
      transform(option, node) {
        const meta = source.getNodeMeta(node);
        if (!meta) return option;

        return {
          ...option,
          icon: (
            <div
              className='rounded-md border bg-gradient-to-t from-grey-bg-subtle p-0.5 shadow-md'
              style={{
                color: `hsl(var(--${meta.file.dirname}-color))`,
                backgroundColor: `hsl(var(--${meta.file.dirname}-color)/.3)`,
              }}
            >
              {node.icon}
            </div>
          ),
        };
      },
    },
  },
};
