import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const ToggleGroupExample = () => (
  <ToggleGroup defaultValue={['bold']}>
    <ToggleGroupItem aria-label='Toggle bold' value='bold'>
      <IconBold />
    </ToggleGroupItem>
    <ToggleGroupItem aria-label='Toggle italic' value='italic'>
      <IconItalic />
    </ToggleGroupItem>
    <ToggleGroupItem aria-label='Toggle underline' value='underline'>
      <IconUnderline />
    </ToggleGroupItem>
  </ToggleGroup>
);

export default ToggleGroupExample;
