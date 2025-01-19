import { Button } from '@kosori/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kosori/ui/dialog';
import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';

export const DialogDemo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right' htmlFor='name'>
              Name
            </Label>
            <Input className='col-span-3' id='name' value='Pedro Duarte' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right' htmlFor='username'>
              Username
            </Label>
            <Input className='col-span-3' id='username' value='@peduarte' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
