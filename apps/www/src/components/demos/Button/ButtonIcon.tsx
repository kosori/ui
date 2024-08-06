import { Loader2 } from 'lucide-react';

import { Button } from '@kosori/ui/button';

export const ButtonIconDemo = () => {
  return (
    <div className='flex gap-2'>
      <Button icon size='small'>
        <Loader2 />
      </Button>
      <Button icon>
        <Loader2 />
      </Button>
      <Button icon size='large'>
        <Loader2 />
      </Button>
    </div>
  );
};
