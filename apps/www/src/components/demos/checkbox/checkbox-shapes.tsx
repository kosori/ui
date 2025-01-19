import { Checkbox } from '@kosori/ui/checkbox';
import { Label } from '@kosori/ui/label';

export const CheckboxShapesDemo = () => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center space-x-2'>
        <Checkbox id='terms-square' />
        <Label htmlFor='terms-square'>Square</Label>
      </div>

      <div className='flex items-center space-x-2'>
        <Checkbox id='terms-round' shape='round' />
        <Label htmlFor='terms-round'>Round</Label>
      </div>
    </div>
  );
};
