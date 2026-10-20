import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LabelExample = () => (
  <div className='flex flex-col items-start gap-2'>
    <Label htmlFor='kosori-email'>Email</Label>
    <Input
      aria-label='Email'
      id='kosori-email'
      placeholder='you@example.com'
      type='email'
    />
  </div>
);

export default LabelExample;
