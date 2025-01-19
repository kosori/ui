import { Checkbox } from '@kosori/ui/checkbox';
import { Label } from '@kosori/ui/label';

export const CheckboxCaptionDemo = () => {
  return (
    <div className='items-top flex space-x-2'>
      <Checkbox id='terms-caption' />
      <div className='flex flex-col space-y-1'>
        <Label htmlFor='terms-caption'>Accept terms and conditions</Label>
        <p className='text-sm text-grey-text'>
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
