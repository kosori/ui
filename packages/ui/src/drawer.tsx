'use client';

import { forwardRef } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@kosori/ui';

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

/**
 * Drawer component that provides a sliding panel for displaying content.
 *
 * @param {DrawerProps} props - The props for the Drawer component.
 * @param {boolean} [props.shouldScaleBackground=true] - Whether to scale the background when the drawer is open.
 *
 * @example
 * <Drawer>
 *   <DrawerTrigger>Open</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Are you absolutely sure?</DrawerTitle>
 *       <DrawerDescription>This action cannot be undone.</DrawerDescription>
 *     </DrawerHeader>
 *     <DrawerFooter>
 *       <Button>Submit</Button>
 *       <DrawerClose>
 *         <Button variant='outline'>Cancel</Button>
 *       </DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 *
 * @see {@link https://dub.sh/ui-drawer Drawer Docs} for further information.
 */
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

export const DrawerTrigger = DrawerPrimitive.Trigger;

export const DrawerPortal = DrawerPrimitive.Portal;

type DrawerOverlayRef = React.ElementRef<typeof DrawerPrimitive.Overlay>;
type DrawerOverlayProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Overlay
>;

/**
 * DrawerOverlay component that covers the background when the Drawer is open.
 *
 * @param {DrawerOverlayProps} props - The props for the DrawerOverlay component.
 *
 * @example
 * <DrawerOverlay />
 */
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

type DrawerContentRef = React.ElementRef<typeof DrawerPrimitive.Content>;
type DrawerContentProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Content
>;

/**
 * DrawerContent component that wraps the content of the Drawer.
 *
 * @param {DrawerContentProps} props - The props for the DrawerContent component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the DrawerContent.
 *
 * @example
 * <DrawerContent>
 *   <p>Your content goes here.</p>
 * </DrawerContent>
 */
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

type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * DrawerHeader component that wraps the header content of the Drawer.
 *
 * @param {DrawerHeaderProps} props - The props for the DrawerHeader component.
 *
 * @example
 * <DrawerHeader>
 *   <DrawerTitle>Drawer Title</DrawerTitle>
 * </DrawerHeader>
 */
export const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div
    className={cn('grid gap-1.5 p-4 text-center', 'sm:text-left', className)}
    {...props}
  />
);

DrawerHeader.displayName = 'DrawerHeader';

type DrawerTitleRef = React.ElementRef<typeof DrawerPrimitive.Title>;
type DrawerTitleProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Title
>;

/**
 * DrawerTitle component that displays the title of the Drawer.
 *
 * @param {DrawerTitleProps} props - The props for the DrawerTitle component.
 *
 * @example
 * <DrawerTitle>Drawer Title</DrawerTitle>
 */
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

type DrawerDescriptionRef = React.ElementRef<
  typeof DrawerPrimitive.Description
>;
type DrawerDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Description
>;

/**
 * DrawerDescription component that provides a description for the Drawer.
 *
 * @param {DrawerDescriptionProps} props - The props for the DrawerDescription component.
 *
 * @example
 * <DrawerDescription>Drawer Description</DrawerDescription>
 */
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

type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * DrawerFooter component that wraps the footer content of the Drawer.
 *
 * @param {DrawerFooterProps} props - The props for the DrawerFooter component.
 *
 * @example
 * <DrawerFooter>
 *   <Button>Close</Button>
 * </DrawerFooter>
 */
export const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);

DrawerFooter.displayName = 'DrawerFooter';

export const DrawerClose = DrawerPrimitive.Close;
