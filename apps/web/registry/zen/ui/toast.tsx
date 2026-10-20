'use client';

import { Toast as BaseToast } from '@base-ui/react/toast';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconLoader2,
  IconX,
} from '@tabler/icons-react';
import { cn } from 'cn';
import type React from 'react';
import { buttonVariants } from '@/components/ui/button';

const TOAST_ICONS = {
  error: IconAlertCircle,
  info: IconInfoCircle,
  loading: IconLoader2,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
} as const;

type SwipeDirection = 'up' | 'down' | 'left' | 'right';

type ToastData = {
  rootProps?: Omit<
    React.ComponentProps<typeof BaseToast.Root>,
    'children' | 'className' | 'swipeDirection' | 'toast'
  >;
  tooltipStyle?: boolean;
};

const VIEWPORT_CLASS =
  'fixed z-60 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-90 [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(8)] data-[position*=top]:top-(--toast-inset) data-[position*=bottom]:bottom-(--toast-inset) data-[position*=left]:left-(--toast-inset) data-[position*=right]:right-(--toast-inset) data-[position*=center]:left-1/2 data-[position*=center]:-translate-x-1/2';

const ROOT_CLASS =
  'absolute z-[calc(9999-var(--toast-index))] h-(--toast-calc-height) w-full select-none rounded-lg border bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(1%*max(0,var(--toast-index,0))))] not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 [transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s,background-color_.5s] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-expanded:bg-popover dark:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(6%*max(0,var(--toast-index,0))))] dark:data-expanded:bg-popover dark:before:shadow-[0_-1px_--theme(--color-white/6%)] data-[position*=right]:right-0 data-[position*=right]:left-auto data-[position*=left]:right-auto data-[position*=left]:left-0 data-[position*=center]:right-0 data-[position*=center]:left-0 data-[position*=top]:top-0 data-[position*=top]:bottom-auto data-[position*=top]:origin-[50%_calc(50%-50%*min(var(--toast-index,0),1))] data-[position*=bottom]:top-auto data-[position*=bottom]:bottom-0 data-[position*=bottom]:origin-[50%_calc(50%+50%*min(var(--toast-index,0),1))] after:absolute after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full data-[position*=top]:after:top-full data-[position*=bottom]:after:bottom-full [--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))] [--toast-gap:--spacing(3)] [--toast-peek:--spacing(3)] [--toast-scale:calc(max(0,1-(var(--toast-index)*.1)))] [--toast-shrink:calc(1-var(--toast-scale))] data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))] data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))] data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))] data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))] data-limited:opacity-0 data-expanded:h-(--toast-height) data-position:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))] motion-safe:data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))] motion-safe:data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))] data-ending-style:opacity-0 motion-reduce:data-starting-style:opacity-0 motion-reduce:[transition:opacity_.5s,height_.15s,background-color_.5s] motion-safe:data-[position*=top]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(-100%-var(--toast-inset)))] motion-safe:data-[position*=bottom]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))] data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))] data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))] data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))] data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))] data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))] data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))] data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]';

const CONTENT_CLASS =
  'pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm transition-opacity duration-250 data-behind:not-data-expanded:pointer-events-none data-behind:opacity-0 data-expanded:opacity-100';

const ICON_WRAPPER_CLASS =
  '[&>svg]:h-lh [&>svg]:w-4 [&_svg]:pointer-events-none [&_svg]:shrink-0';

const ICON_CLASS =
  'in-data-[type=loading]:animate-spin in-data-[type=error]:text-destructive in-data-[type=info]:text-info in-data-[type=success]:text-success in-data-[type=warning]:text-warning in-data-[type=loading]:opacity-80';

function getSwipeDirection(position: ToastPosition): SwipeDirection[] {
  const verticalDirection: SwipeDirection = position.startsWith('top')
    ? 'up'
    : 'down';

  if (position.includes('center')) {
    return [verticalDirection];
  }

  if (position.includes('left')) {
    return ['left', verticalDirection];
  }

  return ['right', verticalDirection];
}

function upsertReplayClassName(toast: {
  type?: string;
  updateKey?: number;
}): string | undefined {
  const k = toast.updateKey ?? 0;
  if (k <= 0) {
    return undefined;
  }
  const isEven = k % 2 === 0;
  if (toast.type === 'error') {
    return isEven
      ? 'animate-toast-error-even motion-reduce:animate-none'
      : 'animate-toast-error-odd motion-reduce:animate-none';
  }
  return isEven
    ? 'animate-toast-success-even motion-reduce:animate-none'
    : 'animate-toast-success-odd motion-reduce:animate-none';
}

export function ToastPortal({
  className,
  ...props
}: BaseToast.Portal.Props): React.ReactElement {
  return (
    <BaseToast.Portal
      className={className}
      data-slot='toast-portal'
      {...props}
    />
  );
}

export function ToastViewport({
  className,
  ...props
}: BaseToast.Viewport.Props): React.ReactElement {
  return (
    <BaseToast.Viewport
      className={cn(VIEWPORT_CLASS, className)}
      data-slot='toast-viewport'
      {...props}
    />
  );
}

export function Toast({
  className,
  ...props
}: BaseToast.Root.Props): React.ReactElement {
  return (
    <BaseToast.Root
      className={cn(ROOT_CLASS, className)}
      data-slot='toast'
      {...props}
    />
  );
}

export function ToastContent({
  className,
  ...props
}: BaseToast.Content.Props): React.ReactElement {
  return (
    <BaseToast.Content
      className={cn(CONTENT_CLASS, className)}
      data-slot='toast-content'
      {...props}
    />
  );
}

export function ToastTitle({
  className,
  ...props
}: BaseToast.Title.Props): React.ReactElement {
  return (
    <BaseToast.Title
      className={cn('font-medium', className)}
      data-slot='toast-title'
      {...props}
    />
  );
}

export function ToastDescription({
  className,
  ...props
}: BaseToast.Description.Props): React.ReactElement {
  return (
    <BaseToast.Description
      className={cn('text-muted-foreground', className)}
      data-slot='toast-description'
      {...props}
    />
  );
}

export function ToastAction({
  className,
  ...props
}: BaseToast.Action.Props): React.ReactElement {
  return (
    <BaseToast.Action
      className={cn(buttonVariants({ size: 'xs' }), className)}
      data-slot='toast-action'
      {...props}
    />
  );
}

export function ToastClose({
  children,
  className,
  ...props
}: BaseToast.Close.Props): React.ReactElement {
  return (
    <BaseToast.Close
      aria-label='Close toast'
      className={cn(
        'relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[""] hover:text-foreground',
        className
      )}
      data-slot='toast-close'
      {...props}
    >
      {children ?? <IconX aria-hidden='true' className='size-4' />}
    </BaseToast.Close>
  );
}

function Toasts({
  position,
  portalProps,
}: {
  position: ToastPosition;
  portalProps?: React.ComponentProps<typeof BaseToast.Portal>;
}): React.ReactElement {
  const { toasts } = useToastManager();
  const swipeDirection = getSwipeDirection(position);

  return (
    <ToastPortal {...portalProps}>
      <ToastViewport data-position={position}>
        {toasts.map((toast) => {
          const Icon = toast.type
            ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]
            : null;
          const toastData = toast.data as ToastData | undefined;

          return (
            <Toast
              className={upsertReplayClassName(toast)}
              key={toast.id}
              {...toastData?.rootProps}
              data-position={position}
              swipeDirection={swipeDirection}
              toast={toast}
            >
              <ToastContent>
                <div className='flex gap-2'>
                  {/* biome-ignore lint/suspicious/noLeakedRender: Icon is a component or null */}
                  {Icon && (
                    <div className={ICON_WRAPPER_CLASS} data-slot='toast-icon'>
                      <Icon className={ICON_CLASS} />
                    </div>
                  )}

                  <div className='flex flex-col gap-0.5'>
                    <ToastTitle />
                    <ToastDescription />
                  </div>
                </div>
                {/* biome-ignore lint/suspicious/noLeakedRender: actionProps is an object or undefined */}
                {toast.actionProps && (
                  <ToastAction>{toast.actionProps.children}</ToastAction>
                )}
              </ToastContent>
            </Toast>
          );
        })}
      </ToastViewport>
    </ToastPortal>
  );
}

function AnchoredToasts({
  portalProps,
}: {
  portalProps?: React.ComponentProps<typeof BaseToast.Portal>;
}): React.ReactElement {
  const { toasts } = useToastManager();

  return (
    <BaseToast.Portal data-slot='toast-portal-anchored' {...portalProps}>
      <BaseToast.Viewport
        className='outline-none'
        data-slot='toast-viewport-anchored'
      >
        {toasts.map((toast) => {
          const Icon = toast.type
            ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]
            : null;
          const toastData = toast.data as ToastData | undefined;
          const tooltipStyle = toastData?.tooltipStyle ?? false;
          const { positionerProps } = toast;

          if (!positionerProps?.anchor) {
            return null;
          }

          return (
            <BaseToast.Positioner
              className='z-60 max-w-[min(--spacing(64),var(--available-width))]'
              data-slot='toast-positioner'
              key={toast.id}
              sideOffset={positionerProps.sideOffset ?? 4}
              toast={toast}
            >
              <BaseToast.Root
                className={cn(
                  'relative text-balance border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:opacity-0 data-starting-style:opacity-0 motion-safe:data-ending-style:scale-98 motion-safe:data-starting-style:scale-98 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
                  tooltipStyle
                    ? 'rounded-md shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]'
                    : 'rounded-lg shadow-lg/5 before:rounded-[calc(var(--radius-lg)-1px)]',
                  upsertReplayClassName(toast)
                )}
                {...toastData?.rootProps}
                data-slot='toast-popup'
                toast={toast}
              >
                {tooltipStyle ? (
                  <BaseToast.Content className='pointer-events-auto px-2 py-1'>
                    <ToastTitle />
                  </BaseToast.Content>
                ) : (
                  <BaseToast.Content className='pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm'>
                    <div className='flex gap-2'>
                      {/* biome-ignore lint/suspicious/noLeakedRender: Icon is a component or null */}
                      {Icon && (
                        <div
                          className={ICON_WRAPPER_CLASS}
                          data-slot='toast-icon'
                        >
                          <Icon className={ICON_CLASS} />
                        </div>
                      )}

                      <div className='flex flex-col gap-0.5'>
                        <ToastTitle />
                        <ToastDescription />
                      </div>
                    </div>
                    {/* biome-ignore lint/suspicious/noLeakedRender: actionProps is an object or undefined */}
                    {toast.actionProps && (
                      <ToastAction>{toast.actionProps.children}</ToastAction>
                    )}
                  </BaseToast.Content>
                )}
              </BaseToast.Root>
            </BaseToast.Positioner>
          );
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

export const toastManager: ReturnType<typeof BaseToast.createToastManager> =
  BaseToast.createToastManager();

export const anchoredToastManager: ReturnType<
  typeof BaseToast.createToastManager
> = BaseToast.createToastManager();

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastProviderProps extends BaseToast.Provider.Props {
  portalProps?: React.ComponentProps<typeof BaseToast.Portal>;
  position?: ToastPosition;
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  portalProps,
  ...props
}: ToastProviderProps): React.ReactElement {
  return (
    <BaseToast.Provider toastManager={toastManager} {...props}>
      {children}
      <Toasts portalProps={portalProps} position={position} />
    </BaseToast.Provider>
  );
}

export interface ToasterProps extends BaseToast.Provider.Props {
  portalProps?: React.ComponentProps<typeof BaseToast.Portal>;
  position?: ToastPosition;
}

export function Toaster({
  children,
  position = 'bottom-right',
  portalProps,
  toastManager: manager = toastManager,
  ...props
}: ToasterProps): React.ReactElement {
  return (
    <BaseToast.Provider toastManager={manager} {...props}>
      {children}
      <Toasts portalProps={portalProps} position={position} />
    </BaseToast.Provider>
  );
}

export interface AnchoredToastProviderProps extends BaseToast.Provider.Props {
  portalProps?: React.ComponentProps<typeof BaseToast.Portal>;
}

export function AnchoredToastProvider({
  children,
  portalProps,
  ...props
}: AnchoredToastProviderProps): React.ReactElement {
  return (
    <BaseToast.Provider toastManager={anchoredToastManager} {...props}>
      {children}
      <AnchoredToasts portalProps={portalProps} />
    </BaseToast.Provider>
  );
}

const { createToastManager, useToastManager } = BaseToast;

export const toast = toastManager;

// biome-ignore lint/performance/noBarrelFile: the Base UI namespace stays public for anchored composition
export { Toast as ToastPrimitive } from '@base-ui/react/toast';
export { createToastManager, useToastManager };
