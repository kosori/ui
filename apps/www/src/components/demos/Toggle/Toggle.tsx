import { FontBoldIcon } from '@radix-ui/react-icons';

import { Toggle } from '@kosori/ui/toggle';

export const ToggleDemo = () => {
  return (
    <Toggle icon aria-label='Toggle italic'>
      <FontBoldIcon />
    </Toggle>
  );
};
