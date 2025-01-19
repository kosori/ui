import { FontItalicIcon } from '@radix-ui/react-icons';

import { Toggle } from '@kosori/ui/toggle';

export const ToggleSizesDemo = () => {
  return (
    <div className='flex gap-2'>
      <Toggle icon aria-label='Toggle small' size='small'>
        <FontItalicIcon />
      </Toggle>

      <Toggle icon aria-label='Toggle medium'>
        <FontItalicIcon />
      </Toggle>

      <Toggle icon aria-label='Toggle large' size='large'>
        <FontItalicIcon />
      </Toggle>
    </div>
  );
};
