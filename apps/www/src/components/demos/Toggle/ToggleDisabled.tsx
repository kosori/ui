import { FontItalicIcon } from '@radix-ui/react-icons';

import { Toggle } from '@kosori/ui/toggle';

export const ToggleDisabledDemo = () => {
  return (
    <Toggle disabled aria-label='Toggle italic'>
      <FontItalicIcon className='h-4 w-4' />
    </Toggle>
  );
};
