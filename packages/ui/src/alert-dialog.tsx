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

/**
 * AlertDialog component that displays a modal dialog for user confirmation or alerts.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - Additional props to pass to the alert dialog.
 *
 * @example
 * <AlertDialog>
 *   <AlertDialogTrigger>Open Alert</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Confirm Action</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         Are you sure you want to proceed with this action?
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Confirm</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 *
 * @see {@link https://dub.sh/ui-alert-dialog Alert Dialog Docs} for further information.
 */
export const AlertDialog = Root;

/**
 * AlertDialogTrigger component for the AlertDialog that activates the dialog when clicked.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Trigger>} props - Additional props to pass to the alert dialog trigger.
 *
 * @example
 * <AlertDialogTrigger>Open Alert</AlertDialogTrigger>
 */
export const AlertDialogTrigger = Trigger;

/**
 * AlertDialogPortal component for rendering the AlertDialog in a separate part of the DOM.
 *
 * @param {AlertDialogPortalProps} props - Additional props to pass to the alert dialog portal.
 *
 * @example
 * <AlertDialogPortal>
 *   <AlertDialogOverlay />
 *   <AlertDialogContent>...</AlertDialogContent>
 * </AlertDialogPortal>
 */
export const AlertDialogPortal = ({
  children,
  ...props
}: AlertDialogPortalProps) => <Portal {...props}>{children}</Portal>;

AlertDialogPortal.displayName = Portal.displayName;

type AlertDialogOverlayRef = React.ElementRef<typeof Overlay>;
type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<typeof Overlay>;

/**
 * AlertDialogOverlay component that covers the background when the AlertDialog is open.
 *
 * @param {AlertDialogOverlayProps} props - Additional props to pass to the alert dialog overlay.
 *
 * @example
 * <AlertDialogOverlay />
 */
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

type AlertDialogContentRef = React.ElementRef<typeof Content>;
type AlertDialogContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * AlertDialogContent component for the AlertDialog that contains the main dialog content.
 *
 * @param {AlertDialogContentProps} props - Additional props to pass to the alert dialog content.
 *
 * @example
 * <AlertDialogContent>
 *   <AlertDialogTitle>Confirm Action</AlertDialogTitle>
 *   <AlertDialogDescription>
 *     Are you sure you want to proceed with this action?
 *   </AlertDialogDescription>
 * </AlertDialogContent>
 */
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

type AlertDialogCancelRef = React.ElementRef<typeof Cancel>;
type AlertDialogRadixCancelProps = React.ComponentPropsWithoutRef<
  typeof Cancel
>;
type AlertDialogCancelProps = object &
  AlertDialogRadixCancelProps &
  ButtonProps;

/**
 * AlertDialogCancel button component for the AlertDialog that closes the dialog without taking action.
 *
 * @param {AlertDialogCancelProps} props - Additional props to pass to the cancel button.
 *
 * @example
 * <AlertDialogCancel>Cancel</AlertDialogCancel>
 */
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

type AlertDialogActionRef = React.ElementRef<typeof Action>;
type AlertDialogRadixActionProps = React.ComponentPropsWithoutRef<
  typeof Action
>;
type AlertDialogActionProps = object &
  AlertDialogRadixActionProps &
  ButtonProps;

/**
 * AlertDialogAction button component for the AlertDialog that confirms the action.
 *
 * @param {AlertDialogActionProps} props - Additional props to pass to the action button.
 *
 * @example
 * <AlertDialogAction>Confirm</AlertDialogAction>
 */
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

type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * AlertDialogHeader component for the AlertDialog that contains the title and description.
 *
 * @param {AlertDialogHeaderProps} props - Additional props to pass to the alert dialog header.
 *
 * @example
 * <AlertDialogHeader>
 *   <AlertDialogTitle>Confirm Action</AlertDialogTitle>
 *   <AlertDialogDescription>
 *     Are you sure you want to proceed with this action?
 *   </AlertDialogDescription>
 * </AlertDialogHeader>
 */
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

type AlertDialogTitleRef = React.ElementRef<typeof Title>;
type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof Title>;

/**
 * AlertDialogTitle component for the AlertDialog that displays the dialog title.
 *
 * @param {AlertDialogTitleProps} props - Additional props to pass to the alert dialog title.
 *
 * @example
 * <AlertDialogTitle>Confirm Action</AlertDialogTitle>
 */
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

type AlertDialogDescriptionRef = React.ElementRef<typeof Description>;
type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof Description
>;

/**
 * AlertDialogDescription component for the AlertDialog that provides additional information.
 *
 * @param {AlertDialogDescriptionProps} props - Additional props to pass to the alert dialog description.
 *
 * @example
 * <AlertDialogDescription>
 *   Are you sure you want to proceed with this action?
 * </AlertDialogDescription>
 */
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

type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * AlertDialogFooter component for the AlertDialog that contains action buttons.
 *
 * @param {AlertDialogFooterProps} props - Additional props to pass to the alert dialog footer.
 *
 * @example
 * <AlertDialogFooter>
 *   <AlertDialogCancel>Cancel</AlertDialogCancel>
 *   <AlertDialogAction>Confirm</AlertDialogAction>
 * </AlertDialogFooter>
 */
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
