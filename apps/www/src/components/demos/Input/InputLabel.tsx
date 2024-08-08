import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';

export const InputLabelDemo = () => {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='email'>Email</Label>
      <Input type='email' id='email' placeholder='Email' />
    </div>
  );
};
