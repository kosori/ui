import { useMemo } from 'react';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

import { Components } from './Components';

type Props = { name: string; children: React.ReactNode };

export const ComponentPreview = ({ name, children }: Props) => {
  const PreviewComponent = useMemo(() => {
    const Component = Components[name]?.component;

    if (!Component) {
      return (
        <p className='text-muted-foreground text-sm'>
          Component{' '}
          <code className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm'>
            {name}
          </code>{' '}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div>
      <Tabs items={['Preview', 'Code']}>
        <Tab className='p-0' value='Preview'>
          <div className='not-prose flex min-h-[350px] items-center justify-center p-4'>
            {PreviewComponent}
          </div>
        </Tab>

        <Tab className='p-0' value='Code'>
          <div className='not-prose [&_figure]:my-0 [&_figure]:max-h-[350px] [&_figure]:overflow-y-auto [&_figure]:rounded-none [&_figure]:border-0'>
            {children}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};