'use client';

import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';

import { cn } from '@kosori/ui';
import { Button } from '@kosori/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@kosori/ui/collapsible';

export const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      className='w-[350px] space-y-2'
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className='flex items-center justify-between space-x-4'>
        <h4 className='text-sm font-medium'>
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button icon className='p-[9px]' size='small' variant='soft'>
            <PlusIcon
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isOpen ? 'rotate-45' : 'rotate-0',
              )}
            />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className='rounded-xl border px-4 py-2 text-sm'>
        @radix-ui/primitives
      </div>
      <CollapsibleContent className='space-y-2'>
        <div className='rounded-xl border px-4 py-2 text-sm'>
          @radix-ui/colors
        </div>
        <div className='rounded-xl border px-4 py-2 text-sm'>
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
