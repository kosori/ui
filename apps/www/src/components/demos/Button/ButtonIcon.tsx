import { PauseIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react';

import { Button } from '@kosori/ui/button';

export const ButtonIconDemo = () => {
  return (
    <div className='flex gap-4'>
      <Button>
        <SkipBackIcon />
        Click me
      </Button>
      <Button icon>
        <PauseIcon />
      </Button>
      <Button>
        Click me
        <SkipForwardIcon />
      </Button>
    </div>
  );
};
