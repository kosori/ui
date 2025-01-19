import { FontItalicIcon } from '@radix-ui/react-icons';

import { Toggle } from '@kosori/ui/toggle';

export const ToggleDisabledDemo = () => {
  return (
    <Toggle disabled icon aria-label='Toggle italic'>
      <FontItalicIcon />
    </Toggle>
  );
};
