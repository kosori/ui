import { BoxSelectIcon, GhostIcon } from 'lucide-react';

import { Toggle } from '@kosori/ui/toggle';

export const ToggleVariantsDemo = () => {
  return (
    <div className='flex gap-2'>
      <Toggle aria-label='Toggle ghost'>
        <GhostIcon className='size-4' />
        Gost
      </Toggle>

      <Toggle aria-label='Toggle outline' variant='outline'>
        <BoxSelectIcon className='size-4' />
        Outline
      </Toggle>
    </div>
  );
};
