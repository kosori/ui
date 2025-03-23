import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';

export const InputFileDemo = () => {
  return (
    <div className='grid w-full max-w-xs items-center gap-1.5'>
      <Label htmlFor='picture'>Picture</Label>
      <Input id='picture' type='file' />
    </div>
  );
};
