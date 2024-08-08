import { CopyIcon } from '@radix-ui/react-icons';

import { Button } from '@kosori/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kosori/ui/dialog';
import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';

export const DialogCustomCloseButtonDemo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Share</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label className='sr-only' htmlFor='link'>
              Link
            </Label>
            <Input
              readOnly
              defaultValue='https://ui.shadcn.com/docs/installation'
              id='link'
            />
          </div>
          <Button icon className='px-3' size='medium' type='submit'>
            <span className='sr-only'>Copy</span>
            <CopyIcon />
          </Button>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
