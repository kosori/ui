import { useMemo } from 'react';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

import { Components } from './Components';

type Props = { name: string; children: React.ReactNode };

export const ComponentPreview = ({ name, children }: Props) => {
  const PreviewComponent = useMemo(() => {
    const Component = Components[name]?.component;

    if (!Component) {
      return (
        <p className='text-sm text-grey-text'>
          Component{' '}
          <code className='relative rounded bg-grey-bg px-[0.3rem] py-[0.2rem] font-mono text-sm'>
            {name}
          </code>{' '}
          not found in the library.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div>
      <Tabs
        className='overflow-visible [&>*:first-child]:rounded-t-xl'
        items={['Preview', 'Code']}
      >
        <Tab className='p-0' value='Preview'>
          <div className='not-prose flex min-h-[350px] items-center justify-center p-4'>
            {PreviewComponent}
          </div>
        </Tab>

        <Tab className='p-0' value='Code'>
          <div className='[&_figure]:my-0 [&_figure]:rounded-b-xl [&_figure]:rounded-t-none [&_figure]:border-0'>
            {children}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
