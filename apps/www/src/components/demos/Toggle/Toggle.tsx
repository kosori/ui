import { FontBoldIcon } from '@radix-ui/react-icons';

import { Toggle } from '@kosori/ui/toggle';

export const ToggleDemo = () => {
  return (
    <Toggle aria-label='Toggle italic'>
      <FontBoldIcon className='h-4 w-4' />
    </Toggle>
  );
};
