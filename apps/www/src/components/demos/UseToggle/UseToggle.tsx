'use client';

import { Button } from '@kosori/ui/button';
import { Switch } from '@kosori/ui/switch';

import { useToggle } from '~/hooks/use-toggle';

export const UseToggleDemo = () => {
  const { on, toggle, setToggle } = useToggle();

  return (
    <div>
      <Switch
        aria-label='Toggle'
        checked={on}
        size='large'
        onCheckedChange={toggle}
      />

      <div className='flex gap-2'>
        <Button size='small' variant='outline' onClick={toggle}>
          Toggle
        </Button>
        <Button size='small' variant='outline' onClick={() => setToggle(true)}>
          Set toggle: True
        </Button>
        <Button size='small' variant='outline' onClick={() => setToggle(false)}>
          Set toggle: False
        </Button>
      </div>
    </div>
  );
};
