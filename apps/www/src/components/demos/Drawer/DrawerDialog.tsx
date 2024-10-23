'use client';

import { useState } from 'react';
import { clsx } from 'clsx/lite';

import { useMediaQuery } from '@kosori/hooks/use-media-query';
import { Button } from '@kosori/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kosori/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@kosori/ui/drawer';
import { Input } from '@kosori/ui/input';
import { Label } from '@kosori/ui/label';

export const DrawerDialogDemo = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className='px-4' />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button className='w-full' variant='outline'>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const ProfileForm = ({ className }: React.ComponentProps<'form'>) => {
  return (
    <form className={clsx('grid items-start gap-4', className)}>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input defaultValue='shadcn@example.com' id='email' type='email' />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='username'>Username</Label>
        <Input defaultValue='@shadcn' id='username' />
      </div>
      <Button className='w-full' type='submit'>
        Save changes
      </Button>
    </form>
  );
};
