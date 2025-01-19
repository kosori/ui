'use client';

import { Button } from '@kosori/ui/button';
import { ToastAction, useToast } from '@kosori/ui/toast';

export const ToastIntentsDemo = () => {
  const { toast } = useToast();

  return (
    <div className='grid grid-cols-2 gap-2'>
      <Button
        className='w-full'
        variant='outline'
        onClick={() => {
          toast({
            title: 'Default',
            description: 'This is a toast with default intent.',
            action: <ToastAction altText=''>Action</ToastAction>,
          });
        }}
      >
        Default
      </Button>

      <Button
        className='w-full'
        variant='outline'
        onClick={() => {
          toast({
            title: 'Info',
            description: 'This is a toast with info intent.',
            action: <ToastAction altText=''>Action</ToastAction>,
            intent: 'info',
          });
        }}
      >
        Info
      </Button>

      <Button
        className='w-full'
        variant='outline'
        onClick={() => {
          toast({
            title: 'Success',
            description: 'This is a toast with success intent.',
            action: <ToastAction altText=''>Action</ToastAction>,
            intent: 'success',
          });
        }}
      >
        Success
      </Button>

      <Button
        className='w-full'
        variant='outline'
        onClick={() => {
          toast({
            title: 'Warning',
            description: 'This is a toast with warning intent.',
            action: <ToastAction altText=''>Action</ToastAction>,
            intent: 'warning',
          });
        }}
      >
        Warning
      </Button>

      <Button
        className='w-full'
        variant='outline'
        onClick={() => {
          toast({
            title: 'Error',
            description: 'This is a toast with error intent.',
            action: <ToastAction altText=''>Action</ToastAction>,
            intent: 'error',
          });
        }}
      >
        Error
      </Button>
    </div>
  );
};
