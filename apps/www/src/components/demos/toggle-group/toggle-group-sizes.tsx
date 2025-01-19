import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';

import { ToggleGroup, ToggleGroupItem } from '@kosori/ui/toggle-group';

export const ToggleGroupSizesDemo = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <ToggleGroup size='small' type='multiple'>
        <ToggleGroupItem icon aria-label='Toggle bold' value='bold'>
          <FontBoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem icon aria-label='Toggle italic' value='italic'>
          <FontItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem
          icon
          aria-label='Toggle strikethrough'
          value='strikethrough'
        >
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type='multiple'>
        <ToggleGroupItem icon aria-label='Toggle bold' value='bold'>
          <FontBoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem icon aria-label='Toggle italic' value='italic'>
          <FontItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem
          icon
          aria-label='Toggle strikethrough'
          value='strikethrough'
        >
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup size='large' type='multiple'>
        <ToggleGroupItem icon aria-label='Toggle bold' value='bold'>
          <FontBoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem icon aria-label='Toggle italic' value='italic'>
          <FontItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem
          icon
          aria-label='Toggle strikethrough'
          value='strikethrough'
        >
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
