import { Checkbox } from '@kosori/ui/checkbox';
import { Label } from '@kosori/ui/label';

export const CheckboxSizesDemo = () => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center space-x-2'>
        <Checkbox id='terms-small' />
        <Label htmlFor='terms-small'>Small</Label>
      </div>

      <div className='flex items-center space-x-2'>
        <Checkbox id='terms-medium' size='medium' />
        <Label htmlFor='terms-medium'>Medium</Label>
      </div>
    </div>
  );
};
