import { Button } from '@kosori/ui/button';
import { Textarea } from '@kosori/ui/textarea';

export const TextareaButtonDemo = () => {
  return (
    <div className='grid w-full max-w-md gap-2'>
      <Textarea placeholder='Type your message here.' />
      <Button>Send message</Button>
    </div>
  );
};
