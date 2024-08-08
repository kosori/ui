'use client';

import type { DialogPortalProps } from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { cn } from '@kosori/ui';

// --- Component:Dialog ---
export const Dialog = Root;

// --- Component:DialogTrigger ---
export const DialogTrigger = Trigger;

// --- Component:DialogPortal ---
export const DialogPortal = ({ children, ...props }: DialogPortalProps) => (
  <Portal {...props}>
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-start justify-center',
        'sm:items-center',
      )}
    >
      {children}
    </div>
  </Portal>
);

DialogPortal.displayName = Portal.displayName;

// --- Component:DialogOverlay ---
type DialogOverlayRef = React.ElementRef<typeof Overlay>;
type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof Overlay>;

export const DialogOverlay = forwardRef<DialogOverlayRef, DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black-a6 backdrop-blur-sm',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className,
      )}
      {...props}
    />
  ),
);

DialogOverlay.displayName = Overlay.displayName;

// --- Component:DialogContent ---
type DialogContentRef = React.ElementRef<typeof Content>;
type DialogContentProps = React.ComponentPropsWithoutRef<typeof Content>;

export const DialogContent = forwardRef<DialogContentRef, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />

      <Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 border border-grey-line bg-grey-base p-6 shadow-lg duration-200',
          'sm:max-w-lg sm:rounded-lg',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          className,
        )}
        {...props}
      >
        {children}

        <Close
          className={cn(
            'absolute right-4 top-4 rounded ring-offset-grey-bg transition-opacity',
            'focus:outline focus:outline-grey-focus-ring',
            'disabled:cursor-not-allowed disabled:text-grey-text',
          )}
        >
          <Cross2Icon className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </Close>
      </Content>
    </DialogPortal>
  ),
);

DialogContent.displayName = Content.displayName;

// --- Component:Close ---
export const DialogClose = Close;

// --- Component:DialogHeader ---
type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div
    className={cn(
      'flex flex-col gap-y-1.5 text-center',
      'sm:text-left',
      className,
    )}
    {...props}
  />
);

DialogHeader.displayName = 'DialogHeader';

// --- Component:DialogTitle ---
type DialogTitleRef = React.ElementRef<typeof Title>;
type DialogTitleProps = React.ComponentPropsWithoutRef<typeof Title>;

export const DialogTitle = forwardRef<DialogTitleRef, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <Title
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  ),
);

DialogTitle.displayName = Title.displayName;

// --- Component:DialogDescription ---
type DialogDescriptionRef = React.ElementRef<typeof Description>;
type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof Description
>;

export const DialogDescription = forwardRef<
  DialogDescriptionRef,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn('text-sm text-grey-text', className)}
    {...props}
  />
));

DialogDescription.displayName = Description.displayName;

// --- Component:DialogFooter ---
type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    className={cn(
      'flex flex-col-reverse',
      'sm:flex-row sm:justify-end sm:gap-x-2',
      className,
    )}
    {...props}
  />
);

DialogFooter.displayName = 'DialogFooter';
