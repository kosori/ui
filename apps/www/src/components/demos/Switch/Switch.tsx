import { Label } from '@kosori/ui/label';
import { Switch } from '@kosori/ui/switch';

export const SwitchDemo = () => {
  return (
    <div className='flex items-center space-x-2'>
      <Switch id='airplane-mode' />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </div>
  );
};
