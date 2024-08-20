'use client';

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
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const dialogStyles = tv({
  slots: {
    overlay: clsx(
      'fixed inset-0 z-50 bg-black-a6 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
    ),
    content: clsx(
      'fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 border border-grey-line bg-grey-base p-6 shadow-lg duration-200',
      'sm:max-w-lg sm:rounded-lg',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    ),
    contentClose: clsx(
      'absolute right-4 top-4 rounded ring-offset-grey-bg transition-opacity',
      'focus:outline focus:outline-grey-focus-ring',
      'disabled:cursor-not-allowed disabled:text-grey-text',
    ),
    contentIcon: 'size-4',
    header: clsx('flex flex-col gap-y-1.5 text-center', 'sm:text-left'),
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-grey-text',
    footer: clsx(
      'flex flex-col-reverse',
      'sm:flex-row sm:justify-end sm:gap-x-2',
    ),
  },
});

const {
  overlay,
  content,
  contentClose,
  contentIcon,
  header,
  title,
  description,
  footer,
} = dialogStyles();

/**
 * Dialog component that provides a modal dialog for user interactions.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the Dialog component.
 *
 * @example
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Are you absolutely sure?</DialogTitle>
 *       <DialogDescription>
 *         This action cannot be undone. This will permanently delete your account
 *         and remove your data from our servers.
 *       </DialogDescription>
 *     </DialogHeader>
 *   </DialogContent>
 * </Dialog>
 *
 * @see {@link https://dub.sh/ui-dialog Dialog Docs} for further information.
 */
export const Dialog = Root;

/**
 * DialogTrigger component that serves as the trigger for the Dialog.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Trigger>} props - The props for the DialogTrigger component.
 *
 * @example
 * <DialogTrigger>Open</DialogTrigger>
 */
export const DialogTrigger = Trigger;

/**
 * DialogPortal component that renders the Dialog in a portal.
 *
 * @param {DialogPortalProps} props - The props for the DialogPortal component.
 */
export const DialogPortal = Portal;

type DialogOverlayRef = React.ElementRef<typeof Overlay>;
type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof Overlay>;

/**
 * DialogOverlay component that covers the background when the Dialog is open.
 *
 * @param {DialogOverlayProps} props - The props for the DialogOverlay component.
 *
 * @example
 * <DialogOverlay />
 */
export const DialogOverlay = forwardRef<DialogOverlayRef, DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <Overlay ref={ref} className={overlay({ className })} {...props} />
  ),
);

DialogOverlay.displayName = Overlay.displayName;

type DialogContentRef = React.ElementRef<typeof Content>;
type DialogContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * DialogContent component that wraps the content of the Dialog.
 *
 * @param {DialogContentProps} props - The props for the DialogContent component.
 *
 * @example
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Dialog Title</DialogTitle>
 *     <DialogDescription>Dialog Description</DialogDescription>
 *   </DialogHeader>
 * </DialogContent>
 */
export const DialogContent = forwardRef<DialogContentRef, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <Content ref={ref} className={content({ className })} {...props}>
        {children}
        <Close className={contentClose()}>
          <Cross2Icon className={contentIcon()} />
          <span className='sr-only'>Close</span>
        </Close>
      </Content>
    </DialogPortal>
  ),
);

DialogContent.displayName = Content.displayName;

/**
 * DialogClose component that closes the Dialog.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Close>} props - The props for the DialogClose component.
 *
 * @example
 * <DialogClose />
 */
export const DialogClose = Close;

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * DialogHeader component that wraps the header content of the Dialog.
 *
 * @param {DialogHeaderProps} props - The props for the DialogHeader component.
 *
 * @example
 * <DialogHeader>
 *   <DialogTitle>Dialog Title</DialogTitle>
 *   <DialogDescription>Dialog Description</DialogDescription>
 * </DialogHeader>
 */
export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={header({ className })} {...props} />
);

DialogHeader.displayName = 'DialogHeader';

type DialogTitleRef = React.ElementRef<typeof Title>;
type DialogTitleProps = React.ComponentPropsWithoutRef<typeof Title>;

/**
 * DialogTitle component that displays the title of the Dialog.
 *
 * @param {DialogTitleProps} props - The props for the DialogTitle component.
 *
 * @example
 * <DialogTitle>Dialog Title</DialogTitle>
 */
export const DialogTitle = forwardRef<DialogTitleRef, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <Title ref={ref} className={title({ className })} {...props} />
  ),
);

DialogTitle.displayName = Title.displayName;

type DialogDescriptionRef = React.ElementRef<typeof Description>;
type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof Description
>;

/**
 * DialogDescription component that provides a description for the Dialog.
 *
 * @param {DialogDescriptionProps} props - The props for the DialogDescription component.
 *
 * @example
 * <DialogDescription>Dialog Description</DialogDescription>
 */
export const DialogDescription = forwardRef<
  DialogDescriptionRef,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <Description ref={ref} className={description({ className })} {...props} />
));

DialogDescription.displayName = Description.displayName;

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * DialogFooter component that wraps the footer content of the Dialog.
 *
 * @param {DialogFooterProps} props - The props for the DialogFooter component.
 *
 * @example
 * <DialogFooter>
 *   <Button>Close</Button>
 * </DialogFooter>
 */
export const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div className={footer({ className })} {...props} />
);

DialogFooter.displayName = 'DialogFooter';
