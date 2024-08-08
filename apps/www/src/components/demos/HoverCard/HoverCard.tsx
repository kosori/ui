import { CalendarIcon } from '@radix-ui/react-icons';

import { Avatar, AvatarFallback, AvatarImage } from '@kosori/ui/avatar';
import { Button } from '@kosori/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@kosori/ui/hover-card';

export const HoverCardDemo = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='ghost'>@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex justify-between space-x-4'>
          <Avatar>
            <AvatarImage src='https://github.com/vercel.png' />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>@nextjs</h4>
            <p className='text-sm'>
              The React Framework – created and maintained by @vercel.
            </p>
            <div className='flex items-center pt-2'>
              <CalendarIcon className='mr-2 h-4 w-4 text-grey-text' />{' '}
              <span className='text-xs text-grey-text'>
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
