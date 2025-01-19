'use client';

import { Button } from '@kosori/ui/button';
import { useToast } from '@kosori/ui/toast';

export const ToastSimpleDemo = () => {
  const { toast } = useToast();

  return (
    <Button
      variant='outline'
      onClick={() => {
        toast({
          description: 'Your message has been sent.',
        });
      }}
    >
      Show Toast
    </Button>
  );
};
