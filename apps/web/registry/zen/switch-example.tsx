import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const SwitchExample = () => (
  <Label
    className='flex items-center gap-6 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50'
    htmlFor='kosori-notifications'
  >
    <div className='flex flex-col gap-1'>
      <p>Enable notifications</p>
      <p className='text-muted-foreground text-xs'>
        You can enable or disable notifications at any time.
      </p>
    </div>
    <Switch
      className='[--thumb-size:--spacing(4)] sm:[--thumb-size:--spacing(3)]'
      defaultChecked
      id='kosori-notifications'
    />
  </Label>
);

export default SwitchExample;
