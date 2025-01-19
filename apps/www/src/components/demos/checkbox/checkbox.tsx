import { Checkbox } from '@kosori/ui/checkbox';
import { Label } from '@kosori/ui/label';

export const CheckboxDemo = () => {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox id='terms' />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
  );
};
