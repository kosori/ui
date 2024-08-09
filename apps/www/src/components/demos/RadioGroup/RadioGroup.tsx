import { Label } from '@kosori/ui/Label';
import { RadioGroup, RadioGroupItem } from '@kosori/ui/radio-group';

export const RadioGroupDemo = () => {
  return (
    <RadioGroup defaultValue='comfortable'>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem id='r1' value='default' />
        <Label htmlFor='r1'>Default</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem id='r2' value='comfortable' />
        <Label htmlFor='r2'>Comfortable</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem disabled id='r3' value='compact' />
        <Label htmlFor='r3'>Compact</Label>
      </div>
    </RadioGroup>
  );
};
