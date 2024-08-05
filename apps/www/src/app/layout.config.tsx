import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { type HomeLayoutProps } from 'fumadocs-ui/home-layout';
import { type DocsLayoutProps } from 'fumadocs-ui/layout';

import { docs } from '~/app/source';
import { modes } from '~/config/modes';

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
  nav: {
    ...baseOptions.nav,
    transparentMode: 'none',
    children: undefined,
  },
  sidebar: {
    defaultOpenLevel: 0,
    banner: (
      <RootToggle
        options={modes.map((mode) => ({
          url: `/docs/${mode.param}`,
          icon: (
            <div className='flex items-center justify-center'>
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
