'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

const addDefaultToast = () => {
  toast.add({
    description: 'Monday, January 3rd at 6:00pm',
    title: 'Event has been created',
  });
};

const addSuccessToast = () => {
  toast.add({
    description: 'Your changes have been saved.',
    title: 'Success!',
    type: 'success',
  });
};

const addErrorToast = () => {
  toast.add({
    description: 'There was a problem with your request.',
    title: 'Uh oh! Something went wrong.',
    type: 'error',
  });
};

const addInfoToast = () => {
  toast.add({
    description: 'You can add components to your app using the cli.',
    title: 'Heads up!',
    type: 'info',
  });
};

const addWarningToast = () => {
  toast.add({
    description: 'Your session is about to expire.',
    title: 'Warning!',
    type: 'warning',
  });
};

const ToastExample = () => (
  <div className='flex flex-wrap gap-2'>
    <Button onClick={addDefaultToast} variant='outline'>
      Default Toast
    </Button>
    <Button onClick={addSuccessToast} variant='outline'>
      Success Toast
    </Button>
    <Button onClick={addErrorToast} variant='outline'>
      Error Toast
    </Button>
    <Button onClick={addInfoToast} variant='outline'>
      Info Toast
    </Button>
    <Button onClick={addWarningToast} variant='outline'>
      Warning Toast
    </Button>
  </div>
);

export default ToastExample;
