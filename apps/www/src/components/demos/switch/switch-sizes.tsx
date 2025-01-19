import { Label } from '@kosori/ui/label';
import { Switch } from '@kosori/ui/switch';

export const SwitchSizesDemo = () => {
  return (
    <div className='space-x-4'>
      <div className='inline-flex items-center gap-x-2'>
        <Switch id='small' size='small' />
        <Label htmlFor='small'>Small</Label>
      </div>

      <div className='inline-flex items-center gap-x-2'>
        <Switch id='medium' size='medium' />
        <Label htmlFor='medium'>Medium</Label>
      </div>

      <div className='inline-flex items-center gap-x-2'>
        <Switch id='large' size='large' />
        <Label htmlFor='large'>Large</Label>
      </div>
    </div>
  );
};
