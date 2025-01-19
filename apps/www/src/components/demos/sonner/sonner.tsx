'use client';

import { toast } from 'sonner';

import { Button } from '@kosori/ui/button';

export const SonnerDemo = () => {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
          duration: 10000,
        })
      }
    >
      Show Toast
    </Button>
  );
};
