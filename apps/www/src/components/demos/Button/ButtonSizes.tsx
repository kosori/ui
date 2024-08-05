import { Button } from '@kosori/ui/Button';

export const ButtonSizesDemo = () => {
  return (
    <div className='flex gap-2'>
      <Button size='small'>Small</Button>
      <Button>Medium</Button>
      <Button size='large'>Large</Button>
    </div>
  );
};
