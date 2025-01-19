'use client';

import { Button } from '@kosori/ui/button';
import { useToast } from '@kosori/ui/toast';

export const ToastTitleDemo = () => {
  const { toast } = useToast();

  return (
    <Button
      variant='outline'
      onClick={() => {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      }}
    >
      Show Toast
    </Button>
  );
};
