import { Button } from '@/registry/kaze/button';

const ButtonExample = () => (
  <div className='flex flex-wrap items-center gap-2'>
    <Button>Button</Button>
    <Button variant='secondary'>Secondary</Button>
    <Button variant='outline'>Outline</Button>
    <Button variant='ghost'>Ghost</Button>
    <Button variant='destructive'>Destructive</Button>
    <Button variant='link'>Link</Button>
  </div>
);

export default ButtonExample;
