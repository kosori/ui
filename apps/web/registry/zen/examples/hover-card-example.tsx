import { IconCornerUpLeft, IconStar } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const HoverCardExample = () => (
  <HoverCard>
    <HoverCardTrigger render={<Button variant='ghost' />}>
      kosori
    </HoverCardTrigger>
    <HoverCardContent>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h4 className='font-medium text-sm'>kosori</h4>
          <p className='text-muted-foreground text-sm'>
            Components you copy into your project and own from then on.
          </p>
        </div>
        <div className='flex items-center gap-4 text-muted-foreground text-xs'>
          <div className='flex items-center gap-1'>
            <span aria-hidden='true' className='size-2 rounded-full bg-info' />
            <span>TypeScript</span>
          </div>
          <div className='flex items-center gap-1'>
            <IconStar className='size-3' />
            <span>58.2k</span>
          </div>
          <div className='flex items-center gap-1'>
            <IconCornerUpLeft className='size-3' />
            <span>5.1k</span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default HoverCardExample;
