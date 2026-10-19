import { IconBook, IconRoute } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

const EmptyExample = () => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant='icon'>
        <IconRoute />
      </EmptyMedia>
      <EmptyTitle>No upcoming meetings</EmptyTitle>
      <EmptyDescription>Create a meeting to get started.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div className='flex gap-2'>
        <Button size='sm'>Create meeting</Button>
        <Button size='sm' variant='outline'>
          <IconBook />
          View docs
        </Button>
      </div>
    </EmptyContent>
  </Empty>
);

export default EmptyExample;
