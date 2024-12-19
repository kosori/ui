'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';
import { Drawer as DrawerPrimitive } from 'vaul';

const drawerStyles = tv({
  slots: {
    overlay: 'fixed inset-0 z-50 bg-black-a6',
    content:
      'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-grey-line bg-grey-base',
    contentHandle: 'mx-auto mt-4 h-2 w-[100px] rounded-full bg-grey-bg-hover',
    header: clsx('grid gap-1.5 p-4 text-center', 'sm:text-left'),
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-grey-text',
    footer: 'mt-auto flex flex-col gap-2 p-4',
  },
});

const { overlay, content, contentHandle, header, title, description, footer } =
  drawerStyles();

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

/**
 * Drawer component that provides a sliding panel for displaying content.
 *
 * @param {DrawerProps} props - The props for the Drawer component.
 * @param {boolean} [props.shouldScaleBackground=true] - Whether to scale the background when the drawer is open.
 *
 * @example
 * ```tsx
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
 * ```
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

/**
 * DrawerTrigger component that serves as the trigger for the Drawer.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Trigger>} props - The props for the DrawerTrigger component.
 *
 * @example
 * ```tsx
 * <DrawerTrigger>Open</DrawerTrigger>
 * ```
 */
export const DrawerTrigger = DrawerPrimitive.Trigger;

/**
 * DrawerPortal component that renders the Drawer in a portal.
 *
 * @param {DrawerPortalProps} props - The props for the DrawerPortal component.
 */
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
 * ```tsx
 * <DrawerOverlay />
 * ```
 */
export const DrawerOverlay = forwardRef<DrawerOverlayRef, DrawerOverlayProps>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={overlay({ className })}
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
 * ```tsx
 * <DrawerContent>
 *   <p>Your content goes here.</p>
 * </DrawerContent>
 * ```
 */
export const DrawerContent = forwardRef<DrawerContentRef, DrawerContentProps>(
  ({ className, children, ...props }, ref) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={content({ className })}
        {...props}
      >
        <div className={contentHandle()} />
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
 * ```tsx
 * <DrawerHeader>
 *   <DrawerTitle>Drawer Title</DrawerTitle>
 * </DrawerHeader>
 * ```
 */
export const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div className={header({ className })} {...props} />
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
 * ```tsx
 * <DrawerTitle>Drawer Title</DrawerTitle>
 * ```
 */
export const DrawerTitle = forwardRef<DrawerTitleRef, DrawerTitleProps>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Title
      ref={ref}
      className={title({ className })}
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
 * ```tsx
 * <DrawerDescription>Drawer Description</DrawerDescription>
 * ```
 */
export const DrawerDescription = forwardRef<
  DrawerDescriptionRef,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={description({ className })}
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
 * ```tsx
 * <DrawerFooter>
 *   <Button>Close</Button>
 * </DrawerFooter>
 * ```
 */
export const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div className={footer({ className })} {...props} />
);

DrawerFooter.displayName = 'DrawerFooter';

export const DrawerClose = DrawerPrimitive.Close;
