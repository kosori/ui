import { forwardRef } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@kosori/ui';

// --- Component:Drawer ---
type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

export const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: DrawerProps) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);

Drawer.displayName = 'Drawer';

// --- Component:DrawerTrigger ---
export const DrawerTrigger = DrawerPrimitive.Trigger;

// --- Component:DrawerPortal ---
export const DrawerPortal = DrawerPrimitive.Portal;

// --- Component:DrawerOverlay ---
type DrawerOverlayRef = React.ElementRef<typeof DrawerPrimitive.Overlay>;
type DrawerOverlayProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Overlay
>;

export const DrawerOverlay = forwardRef<DrawerOverlayRef, DrawerOverlayProps>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn('fixed inset-0 z-50 bg-black-a6', className)}
      {...props}
    />
  ),
);

DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

// --- Component:DrawerContent ---
type DrawerContentRef = React.ElementRef<typeof DrawerPrimitive.Content>;
type DrawerContentProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Content
>;

export const DrawerContent = forwardRef<DrawerContentRef, DrawerContentProps>(
  ({ className, children, ...props }, ref) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-grey-line bg-grey-base',
          className,
        )}
        {...props}
      >
        <div className='bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full' />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  ),
);

DrawerContent.displayName = 'DrawerContent';

// --- Component:DrawerHeader ---
type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div
    className={cn('grid gap-1.5 p-4 text-center', 'sm:text-left', className)}
    {...props}
  />
);

DrawerHeader.displayName = 'DrawerHeader';

// --- Component:DrawerTitle ---
type DrawerTitleRef = React.ElementRef<typeof DrawerPrimitive.Title>;
type DrawerTitleProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Title
>;

export const DrawerTitle = forwardRef<DrawerTitleRef, DrawerTitleProps>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  ),
);

DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

// --- Component:DrawerDescription ---
type DrawerDescriptionRef = React.ElementRef<
  typeof DrawerPrimitive.Description
>;
type DrawerDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Description
>;

export const DrawerDescription = forwardRef<
  DrawerDescriptionRef,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-grey-text', className)}
    {...props}
  />
));

DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

// --- Component:DrawerFooter ---
type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);

DrawerFooter.displayName = 'DrawerFooter';

// --- Component:DrawerClose ---
export const DrawerClose = DrawerPrimitive.Close;
