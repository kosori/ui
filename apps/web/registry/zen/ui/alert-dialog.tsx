'use client';

import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import { cn } from 'cn';
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
} from 'motion/react';
import type React from 'react';
import { createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { motionTokens, useControllableOpen } from '@/lib/motion';

const AlertDialogOpenContext = createContext<boolean | null>(null);

export const AlertDialogCreateHandle: typeof AlertDialogPrimitive.createHandle =
  AlertDialogPrimitive.createHandle;

/** Resolve an Alert Dialog's open state so its popup can exit before unmounting. */
export function AlertDialog<Payload = unknown>({
  children,
  defaultOpen,
  onOpenChange,
  open,
  ...props
}: AlertDialogPrimitive.Root.Props<Payload>): React.ReactElement {
  const alertDialog =
    useControllableOpen<AlertDialogPrimitive.Root.ChangeEventDetails>({
      defaultOpen,
      onOpenChange,
      open,
    });

  return (
    <AlertDialogOpenContext.Provider value={alertDialog.open}>
      <AlertDialogPrimitive.Root
        onOpenChange={alertDialog.setOpen}
        open={alertDialog.open}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Root>
    </AlertDialogOpenContext.Provider>
  );
}

export const AlertDialogPortal: typeof AlertDialogPrimitive.Portal =
  AlertDialogPrimitive.Portal;

export function AlertDialogTrigger(
  props: AlertDialogPrimitive.Trigger.Props
): React.ReactElement {
  return (
    <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
  );
}

export function AlertDialogBackdrop({
  className,
  render,
  ...props
}: AlertDialogPrimitive.Backdrop.Props): React.ReactElement {
  const transition = motionTokens.spring.smooth;

  return (
    <AlertDialogPrimitive.Backdrop
      className={cn(
        'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm supports-[-webkit-touch-callout:none]:absolute',
        className
      )}
      data-slot='alert-dialog-backdrop'
      render={
        render ?? (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={transition}
          />
        )
      }
      {...props}
    />
  );
}

export function AlertDialogViewport({
  className,
  ...props
}: AlertDialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Viewport
      className={cn(
        'fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4',
        className
      )}
      data-slot='alert-dialog-viewport'
      {...props}
    />
  );
}

export function AlertDialogPopup({
  className,
  bottomStickOnMobile = true,
  portalProps,
  render,
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  bottomStickOnMobile?: boolean;
  portalProps?: AlertDialogPrimitive.Portal.Props;
}): React.ReactElement {
  const open = useContext(AlertDialogOpenContext);
  const reduce = useReducedMotion();
  const transition = motionTokens.spring.smooth;
  const scale = reduce ? 1 : 0.98;

  const popup = (
    <AlertDialogPortal keepMounted={open !== null} {...portalProps}>
      <AlertDialogBackdrop />
      <AlertDialogViewport
        className={cn(
          bottomStickOnMobile &&
            'max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-12'
        )}
      >
        <AlertDialogPrimitive.Popup
          className={cn(
            'motion-reduce:!translate-none relative row-start-2 flex max-h-full min-h-0 w-full min-w-0 max-w-lg origin-center flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 transition-[scale,translate] duration-[var(--duration-fast,160ms)] ease-[var(--ease-standard,cubic-bezier(0.2,0,0,1))] will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] motion-reduce:scale-100 motion-reduce:transition-none sm:scale-[calc(1-0.1*var(--nested-dialogs))] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
            bottomStickOnMobile &&
              'max-sm:max-w-none max-sm:origin-bottom max-sm:rounded-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:before:hidden max-sm:before:rounded-none',
            className
          )}
          data-slot='alert-dialog-popup'
          render={
            render ??
            ((elementProps, state) => (
              <motion.div
                {...(elementProps as HTMLMotionProps<'div'>)}
                animate={{
                  opacity: state.open && !state.nestedDialogOpen ? 1 : 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale }}
                initial={{ opacity: 0, scale }}
                transition={transition}
              />
            ))
          }
          {...props}
        />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );

  if (open === null) {
    return popup;
  }

  return <AnimatePresence>{open && popup}</AnimatePresence>;
}

export function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-6 text-center max-sm:pb-4 sm:text-left',
        className
      )}
      data-slot='alert-dialog-header'
      {...props}
    />
  );
}

export function AlertDialogFooter({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'default' | 'bare';
}): React.ReactElement {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-2xl)-1px)]',
        variant === 'default' && 'border-t bg-muted/72 py-4',
        variant === 'bare' && 'pb-6',
        className
      )}
      data-slot='alert-dialog-footer'
      {...props}
    />
  );
}

export function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground [&_svg:not([class*='size-'])]:size-6",
        className
      )}
      data-slot='alert-dialog-media'
      {...props}
    />
  );
}

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Title
      className={cn('font-bold font-heading text-xl leading-none', className)}
      data-slot='alert-dialog-title'
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='alert-dialog-description'
      {...props}
    />
  );
}

export function AlertDialogClose(
  props: AlertDialogPrimitive.Close.Props
): React.ReactElement {
  return (
    <AlertDialogPrimitive.Close data-slot='alert-dialog-close' {...props} />
  );
}

export function AlertDialogAction({
  loading,
  size,
  variant,
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<
    React.ComponentProps<typeof Button>,
    'loading' | 'size' | 'variant'
  >): React.ReactElement {
  return (
    <AlertDialogPrimitive.Close
      data-slot='alert-dialog-action'
      render={<Button loading={loading} size={size} variant={variant} />}
      {...props}
    />
  );
}

export function AlertDialogCancel({
  loading,
  size,
  variant = 'outline',
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<
    React.ComponentProps<typeof Button>,
    'loading' | 'size' | 'variant'
  >): React.ReactElement {
  return (
    <AlertDialogPrimitive.Close
      data-slot='alert-dialog-cancel'
      render={<Button loading={loading} size={size} variant={variant} />}
      {...props}
    />
  );
}

const Primitive = AlertDialogPrimitive;

export {
  AlertDialogBackdrop as AlertDialogOverlay,
  AlertDialogPopup as AlertDialogContent,
  Primitive as AlertDialogPrimitive,
};
