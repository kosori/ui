import { FontItalicIcon } from '@radix-ui/react-icons';

import { Toggle } from '@kosori/ui/toggle';

export const ToggleTextDemo = () => {
  return (
    <Toggle aria-label='Toggle italic'>
      <FontItalicIcon className='size-4' />
      Italic
    </Toggle>
  );
};
