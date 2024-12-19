import type { VariantProps } from 'tailwind-variants';
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

const sheetStyles = tv({
  slots: {
    overlay: clsx(
      'fixed inset-0 z-50 bg-black-a6',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
    ),
    content: clsx(
      'fixed z-50 gap-4 border-grey-line bg-grey-base p-6 shadow-lg transition ease-in-out',
      'data-[state=open]:duration-500 data-[state=open]:animate-in',
      'data-[state=closed]:duration-300 data-[state=closed]:animate-out',
    ),
    contentClose: clsx(
      'absolute right-4 top-4 rounded ring-offset-grey-bg transition-opacity',
      'focus:outline focus:outline-grey-focus-ring',
      'disabled:cursor-not-allowed disabled:text-grey-text',
    ),
    contentIcon: 'size-4',
    header: clsx('flex flex-col space-y-2 text-center', 'sm:text-left'),
    title: 'text-lg font-semibold text-grey-text-contrast',
    description: 'text-sm text-grey-text',
    footer: clsx(
      'flex flex-col-reverse',
      'sm:flex-row sm:justify-end sm:space-x-2',
    ),
  },
  variants: {
    side: {
      top: {
        content: clsx(
          'inset-x-0 top-0 border-b',
          'data-[state=open]:slide-in-from-top',
          'data-[state=closed]:slide-out-to-top',
        ),
      },
      bottom: {
        content: clsx(
          'inset-x-0 bottom-0 border-t',
          'data-[state=open]:slide-in-from-bottom',
          'data-[state=closed]:slide-out-to-bottom',
        ),
      },
      left: {
        content: clsx(
          'inset-y-0 left-0 h-full w-3/4 border-r',
          'sm:max-w-sm',
          'data-[state=open]:slide-in-from-left',
          'data-[state=closed]:slide-out-to-left',
        ),
      },
      right: {
        content: clsx(
          'inset-y-0 right-0 h-full w-3/4 border-l',
          'sm:max-w-sm',
          'data-[state=open]:slide-in-from-right',
          'data-[state=closed]:slide-out-to-right',
        ),
      },
    },
  },
  defaultVariants: {
    side: 'right',
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
} = sheetStyles();

/**
 * Sheet component that serves as a container for content that can be displayed in a modal-like manner.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the Sheet component.
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger>Open</SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Are you absolutely sure?</SheetTitle>
 *       <SheetDescription>
 *         This action cannot be undone. This will permanently delete your account
 *         and remove your data from our servers.
 *       </SheetDescription>
 *     </SheetHeader>
 *   </SheetContent>
 * </Sheet>
 * ```
 *
 * @see {@link https://dub.sh/ui-sheet Sheet Docs} for further information.
 */
export const Sheet = Root;

/**
 * SheetTrigger component that triggers the display of the sheet content.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Trigger>} props - The props for the SheetTrigger component.
 *
 * @example
 * ```tsx
 * <SheetTrigger>Open</SheetTrigger>
 * ```
 */
export const SheetTrigger = Trigger;

/**
 * SheetPortal component that renders the sheet content in a portal.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Portal>} props - The props for the SheetPortal component.
 *
 * @example
 * ```tsx
 * <SheetPortal>{Your portal content}</SheetPortal>
 * ```
 */
export const SheetPortal = Portal;

type SheetOverlayRef = React.ElementRef<typeof Overlay>;
type SheetOverlayProps = React.ComponentPropsWithoutRef<typeof Overlay>;

/**
 * SheetOverlay component that represents the overlay behind the sheet content.
 *
 * @param {SheetOverlayProps} props - The props for the SheetOverlay component.
 *
 * @example
 * ```tsx
 * <SheetOverlay />
 * ```
 */

export const SheetOverlay = forwardRef<SheetOverlayRef, SheetOverlayProps>(
  ({ className, ...props }, ref) => (
    <Overlay className={overlay({ className })} {...props} ref={ref} />
  ),
);

SheetOverlay.displayName = Overlay.displayName;

type SheetContentRadixRef = React.ElementRef<typeof Content>;
type SheetVariants = VariantProps<typeof sheetStyles>;
type SheetContentProps = React.ComponentPropsWithoutRef<typeof Content> &
  SheetVariants;

/**
 * SheetContent component that displays the content of the sheet.
 *
 * @param {SheetContentProps} props - The props for the SheetContent component.
 * @param {'top' | 'bottom' | 'left' | 'right'} [side='right'] - The side of the sheet to display the content (e.g. 'top', 'bottom', 'left', 'right').
 *
 * @example
 * ```tsx
 * <SheetContent>
 *   {Your content here}
 * </SheetContent>
 * ```
 */
export const SheetContent = forwardRef<SheetContentRadixRef, SheetContentProps>(
  ({ side = 'right', className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <Content ref={ref} className={content({ className, side })} {...props}>
        {children}

        <Close className={contentClose()}>
          <Cross2Icon className={contentIcon()} />
          <span className='sr-only'>Close</span>
        </Close>
      </Content>
    </SheetPortal>
  ),
);

SheetContent.displayName = Content.displayName;

/**
 * SheetClose component that allows closing the sheet.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Close>} props - The props for the SheetClose component.
 *
 * @example
 * ```tsx
 * <SheetClose />
 * ```
 */
export const SheetClose = Close;

/**
 * SheetHeader component that provides a header for the sheet content.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the SheetHeader component.
 *
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Title</SheetTitle>
 * </SheetHeader>
 * ```
 */
export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={header({ className })} {...props} />
);

SheetHeader.displayName = 'SheetHeader';

type SheetTitleRef = React.ElementRef<typeof Title>;
type SheetTitleProps = React.ComponentPropsWithoutRef<typeof Title>;

/**
 * SheetTitle component that displays the title of the sheet.
 *
 * @param {SheetTitleProps} props - The props for the SheetTitle component.
 *
 * @example
 * ```tsx
 * <SheetTitle>Title</SheetTitle>
 * ```
 */
export const SheetTitle = forwardRef<SheetTitleRef, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <Title ref={ref} className={title({ className })} {...props} />
  ),
);

SheetTitle.displayName = Title.displayName;

type SheetDescriptionRef = React.ElementRef<typeof Description>;
type SheetDescriptionProps = React.ComponentPropsWithoutRef<typeof Description>;

/**
 * SheetDescription component that provides a description for the sheet content.
 *
 * @param {SheetDescriptionProps} props - The props for the SheetDescription component.
 *
 * @example
 * ```tsx
 * <SheetDescription>Description text here.</SheetDescription>
 * ```
 */
export const SheetDescription = forwardRef<
  SheetDescriptionRef,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <Description ref={ref} className={description({ className })} {...props} />
));

SheetDescription.displayName = Description.displayName;

/**
 * SheetFooter component that provides a footer for the sheet content.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the SheetFooter component.
 *
 * @example
 * ```tsx
 * <SheetFooter>
 *   {Footer content here}
 * </SheetFooter>
 * ```
 */
export const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={footer({ className })} {...props} />
);

SheetFooter.displayName = 'SheetFooter';
