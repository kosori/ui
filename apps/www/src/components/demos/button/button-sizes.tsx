import { Button } from '@kosori/ui/button';

export const ButtonSizesDemo = () => {
  return (
    <div className='flex items-end gap-4'>
      <Button size='small'>Small</Button>
      <Button>Medium</Button>
      <Button size='large'>Large</Button>
    </div>
  );
};
