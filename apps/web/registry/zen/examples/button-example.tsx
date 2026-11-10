import { Button } from '@/components/ui/button';

const ButtonExample = () => (
  <div className='flex flex-wrap items-center gap-2'>
    <Button>Button</Button>
    <Button disabled>Disabled</Button>
    <Button loading>Loading</Button>
    <Button aria-haspopup='menu'>Popup trigger</Button>
  </div>
);

export default ButtonExample;
