'use client';

import type { AlertDialogPortalProps } from '@radix-ui/react-alert-dialog';
import { forwardRef } from 'react';
import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog';

import type { ButtonProps } from '@kosori/ui/button';
import { cn } from '@kosori/ui';
import { buttonStyles } from '@kosori/ui/button';

// --- Component:AlertDialog ---
export const AlertDialog = Root;

// --- Component:AlertDialogTrigger ---
export const AlertDialogTrigger = Trigger;

// --- Component:AlertDialogPortal ---
export const AlertDialogPortal = ({
  children,
  ...props
}: AlertDialogPortalProps) => <Portal {...props}>{children}</Portal>;

AlertDialogPortal.displayName = Portal.displayName;

// --- Component:AlertDialogOverlay ---
type AlertDialogOverlayRef = React.ElementRef<typeof Overlay>;
type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<typeof Overlay>;

export const AlertDialogOverlay = forwardRef<
  AlertDialogOverlayRef,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
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
));

AlertDialogOverlay.displayName = Overlay.displayName;

// --- Component:AlertDialogContent ---
type AlertDialogContentRef = React.ElementRef<typeof Content>;
type AlertDialogContentProps = React.ComponentPropsWithoutRef<typeof Content>;

export const AlertDialogContent = forwardRef<
  AlertDialogContentRef,
  AlertDialogContentProps
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <Content
      ref={ref}
      className={cn(
        'fixed inset-1/2 z-50 grid h-fit w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-grey-line bg-grey-base p-6 shadow-md duration-200',
        'sm:rounded-lg',
        'md:w-full',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));

AlertDialogContent.displayName = Content.displayName;

// --- Component:AlertDialogCancel ---
type AlertDialogCancelRef = React.ElementRef<typeof Cancel>;
type CancelProps = React.ComponentPropsWithoutRef<typeof Cancel>;
type AlertDialogCancelProps = object & CancelProps & ButtonProps;

export const AlertDialogCancel = forwardRef<
  AlertDialogCancelRef,
  AlertDialogCancelProps
>(({ variant = 'outline', intent, size, icon, className, ...props }, ref) => (
  <Cancel
    ref={ref}
    className={buttonStyles({
      variant,
      intent,
      size,
      icon,
      class: className,
    })}
    {...props}
  />
));

AlertDialogCancel.displayName = Cancel.displayName;

// --- Component:AlertDialogAction ---
type AlertDialogActionRef = React.ElementRef<typeof Action>;
type AlertDialogRadixActionProps = React.ComponentPropsWithoutRef<
  typeof Action
>;
type AlertDialogActionProps = object &
  AlertDialogRadixActionProps &
  ButtonProps;

export const AlertDialogAction = forwardRef<
  AlertDialogActionRef,
  AlertDialogActionProps
>(({ variant, intent, size, icon, className, ...props }, ref) => (
  <Action
    ref={ref}
    className={buttonStyles({
      variant,
      intent,
      size,
      icon,
      class: className,
    })}
    {...props}
  />
));

AlertDialogAction.displayName = Action.displayName;

// --- Component:AlertDialogHeader ---
type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const AlertDialogHeader = ({
  className,
  ...props
}: AlertDialogHeaderProps) => (
  <div
    className={cn(
      'flex flex-col space-y-2',
      'first-letter:sm:text-left',
      className,
    )}
    {...props}
  />
);

AlertDialogHeader.displayName = 'AlertDialogHeader';

// --- Component:AlertDialogTitle ---
type AlertDialogTitleRef = React.ElementRef<typeof Title>;
type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof Title>;

export const AlertDialogTitle = forwardRef<
  AlertDialogTitleRef,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
));

AlertDialogTitle.displayName = Title.displayName;

// --- Component:AlertDialogDescription ---
type AlertDialogDescriptionRef = React.ElementRef<typeof Description>;
type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof Description
>;

export const AlertDialogDescription = forwardRef<
  AlertDialogDescriptionRef,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn('text-sm text-grey-text', className)}
    {...props}
  />
));

AlertDialogDescription.displayName = Description.displayName;

// --- Component:AlertDialogFooter ---
type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const AlertDialogFooter = ({
  className,
  ...props
}: AlertDialogFooterProps) => (
  <div
    className={cn(
      'flex flex-col-reverse',
      'sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);

AlertDialogFooter.displayName = 'AlertDialogFooter';
