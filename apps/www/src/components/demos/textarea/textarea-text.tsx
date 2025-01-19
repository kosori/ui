import { Label } from '@kosori/ui/label';
import { Textarea } from '@kosori/ui/textarea';

export const TextareaTextDemo = () => {
  return (
    <div className='grid w-full max-w-md gap-1.5'>
      <Label htmlFor='with-text'>Your Message</Label>
      <Textarea id='with-text' placeholder='Type your message here.' />
      <p className='text-sm text-grey-text'>
        Your message will be copied to the support team.
      </p>
    </div>
  );
};
