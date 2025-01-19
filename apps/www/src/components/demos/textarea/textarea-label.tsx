import { Label } from '@kosori/ui/label';
import { Textarea } from '@kosori/ui/textarea';

export const TextareaLabelDemo = () => {
  return (
    <div className='grid w-full max-w-md gap-1.5'>
      <Label htmlFor='with-label'>Your message</Label>
      <Textarea id='with-label' placeholder='Type your message here.' />
    </div>
  );
};
