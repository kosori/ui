import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
      <DialogFooter>
        <DialogClose render={<Button variant='outline' />}>Close</DialogClose>
        <Button>Continue</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DialogExample;
