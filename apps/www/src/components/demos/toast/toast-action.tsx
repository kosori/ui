'use client';

import { Button } from '@kosori/ui/button';
import { ToastAction, useToast } from '@kosori/ui/toast';

export const ToastActionDemo = () => {
  const { toast } = useToast();

  return (
    <Button
      variant='outline'
      onClick={() => {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        });
      }}
    >
      Show Toast
    </Button>
  );
};
