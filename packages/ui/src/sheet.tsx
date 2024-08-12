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
import { tv } from 'tailwind-variants';

import { cn } from '@kosori/ui';

// --- Component:Sheet ---
export const Sheet = Root;

// --- Component:SheetTrigger ---
export const SheetTrigger = Trigger;

// --- Component:SheetPortal ---
export const SheetPortal = Portal;

// --- Component:SheetOverlay ---
type SheetOverlayRef = React.ElementRef<typeof Overlay>;
type SheetOverlayProps = React.ComponentPropsWithoutRef<typeof Overlay>;

export const SheetOverlay = forwardRef<SheetOverlayRef, SheetOverlayProps>(
  ({ className, ...props }, ref) => (
    <Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black-a6',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
);

SheetOverlay.displayName = Overlay.displayName;

const sheetStyles = tv({
  base: cn(
    'fixed z-50 gap-4 border-grey-line bg-grey-base p-6 shadow-lg transition ease-in-out',
    'data-[state=open]:duration-500 data-[state=open]:animate-in',
    'data-[state=closed]:duration-300 data-[state=closed]:animate-out',
  ),
  variants: {
    side: {
      top: cn(
        'inset-x-0 top-0 border-b',
        'data-[state=open]:slide-in-from-top',
        'data-[state=closed]:slide-out-to-top',
      ),
      bottom: cn(
        'inset-x-0 bottom-0 border-t',
        'data-[state=open]:slide-in-from-bottom',
        'data-[state=closed]:slide-out-to-bottom',
      ),
      left: cn(
        'inset-y-0 left-0 h-full w-3/4 border-r',
        'sm:max-w-sm',
        'data-[state=open]:slide-in-from-left',
        'data-[state=closed]:slide-out-to-left',
      ),
      right: cn(
        'inset-y-0 right-0 h-full w-3/4 border-l',
        'sm:max-w-sm',
        'data-[state=open]:slide-in-from-right',
        'data-[state=closed]:slide-out-to-right',
      ),
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

// --- Component:SheetContent ---
type SheetContentRadixRef = React.ElementRef<typeof Content>;
type SheetVariants = VariantProps<typeof sheetStyles>;
type SheetContentProps = React.ComponentPropsWithoutRef<typeof Content> &
  SheetVariants;

export const SheetContent = forwardRef<SheetContentRadixRef, SheetContentProps>(
  ({ side = 'right', className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <Content
        ref={ref}
        className={cn(sheetStyles({ side }), className)}
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
    </SheetPortal>
  ),
);

SheetContent.displayName = Content.displayName;

// --- Component:SheetClose ---
export const SheetClose = Close;

// --- Component:SheetHeader ---
export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center',
      'sm:text-left',
      className,
    )}
    {...props}
  />
);

SheetHeader.displayName = 'SheetHeader';

// --- Component:SheetTitle ---
type SheetTitleRef = React.ElementRef<typeof Title>;
type SheetTitleProps = React.ComponentPropsWithoutRef<typeof Title>;

export const SheetTitle = forwardRef<SheetTitleRef, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <Title
      ref={ref}
      className={cn('text-lg font-semibold text-grey-text-contrast', className)}
      {...props}
    />
  ),
);

SheetTitle.displayName = Title.displayName;

// --- Component:SheetDescription ---
type SheetDescriptionRef = React.ElementRef<typeof Description>;
type SheetDescriptionProps = React.ComponentPropsWithoutRef<typeof Description>;

export const SheetDescription = forwardRef<
  SheetDescriptionRef,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn('text-sm text-grey-text', className)}
    {...props}
  />
));

SheetDescription.displayName = Description.displayName;

// --- Component:SheetFooter ---
export const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse',
      'sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);

SheetFooter.displayName = 'SheetFooter';
