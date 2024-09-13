import { HomeIcon } from 'lucide-react';

import { Button } from '@kosori/ui/button';

export const ButtonIconDemo = () => {
  return (
    <div className='flex gap-2'>
      <Button icon size='small'>
        <HomeIcon />
      </Button>
      <Button icon>
        <HomeIcon />
      </Button>
      <Button icon size='large'>
        <HomeIcon />
      </Button>
    </div>
  );
};
