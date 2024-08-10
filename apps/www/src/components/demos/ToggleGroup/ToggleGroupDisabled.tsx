import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';

import { ToggleGroup, ToggleGroupItem } from '@kosori/ui/toggle-group';

export const ToggleGroupDisabledDemo = () => {
  return (
    <ToggleGroup type='multiple' disabled>
      <ToggleGroupItem aria-label='Toggle bold' value='bold'>
        <FontBoldIcon className='h-4 w-4' />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle italic' value='italic'>
        <FontItalicIcon className='h-4 w-4' />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle strikethrough' value='strikethrough'>
        <UnderlineIcon className='h-4 w-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
