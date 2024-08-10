import { FontItalicIcon } from '@radix-ui/react-icons';

import { Toggle } from '@kosori/ui/toggle';

export const ToggleSizesDemo = () => {
  return (
    <div className='flex gap-2'>
      <Toggle aria-label='Toggle small' size='small'>
        <FontItalicIcon className='h-4 w-4' />
      </Toggle>

      <Toggle aria-label='Toggle medium'>
        <FontItalicIcon className='h-4 w-4' />
      </Toggle>

      <Toggle aria-label='Toggle large' size='large'>
        <FontItalicIcon className='h-4 w-4' />
      </Toggle>
    </div>
  );
};
