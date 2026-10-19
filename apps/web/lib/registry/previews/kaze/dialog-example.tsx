import { Button } from '@/registry/kaze/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/kaze/dialog';

const DialogExample = () => (
  <Dialog>
    <DialogTrigger render={<Button variant='outline' />}>
      Open dialog
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>kosori</DialogTitle>
        <DialogDescription>
          A dialog composed from Registry items.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter showCloseButton>
        <Button>Continue</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export { DialogExample };
