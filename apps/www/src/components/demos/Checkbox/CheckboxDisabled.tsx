import { Checkbox } from '@kosori/ui/checkbox';
import { Label } from '@kosori/ui/label';

export const CheckboxDisabledDemo = () => {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox disabled id='terms-disabled' />
      <Label htmlFor='terms-disabled'>Accept terms and conditions</Label>
    </div>
  );
};
