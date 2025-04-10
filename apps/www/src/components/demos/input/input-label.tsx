import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';

export const InputLabelDemo = () => {
  return (
    <div className='grid w-full max-w-xs items-center gap-1.5'>
      <Label htmlFor='email'>Email</Label>
      <Input id='email' placeholder='Email' type='email' />
    </div>
  );
};
