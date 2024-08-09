import { Fragment } from 'react';

import { ScrollArea } from '@kosori/ui/scroll-area';
import { Separator } from '@kosori/ui/separator';

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export const ScrollAreaDemo = () => {
  return (
    <ScrollArea className='h-72 w-48 rounded-md border border-grey-line'>
      <div className='p-4'>
        <h4 className='mb-4 text-sm font-medium leading-none'>Tags</h4>
        {tags.map((tag) => (
          <Fragment key={tag}>
            <div className='text-sm'>{tag}</div>
            <Separator className='my-2' />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};
