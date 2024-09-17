import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';

import { ToggleGroup, ToggleGroupItem } from '@kosori/ui/toggle-group';

export const ToggleGroupSingleDemo = () => {
  return (
    <ToggleGroup type='single'>
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
  );
};
