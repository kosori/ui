import { Button } from '@kosori/ui/button';
import { Input } from '@kosori/ui/input';

export const InputButtonDemo = () => {
  return (
    <div className='flex w-full max-w-sm items-center space-x-2'>
      <Input placeholder='Email' type='email' />
      <Button type='submit'>Subscribe</Button>
    </div>
  );
};
