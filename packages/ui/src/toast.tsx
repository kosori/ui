'use client';

import type { VariantProps } from 'tailwind-variants';
import { forwardRef, useEffect, useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import {
  Action,
  Close,
  Description,
  Provider,
  Root,
  Title,
  Viewport,
} from '@radix-ui/react-toast';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const toastStyles = tv({
  slots: {
    base: clsx(
      'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg transition-all',
      'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
    ),
    action: clsx(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-grey-border bg-grey-base px-3 text-xs font-semibold outline-none transition-colors duration-200',
      'hover:border-grey-border-hover hover:bg-grey-bg-subtle',
      'focus-visible:ring-4 focus-visible:ring-grey-focus-ring',
      'disabled:cursor-not-allowed disabled:border-grey-line disabled:bg-grey-base disabled:text-grey-solid',
      'group-[.info]:border-info-border group-[.info]:bg-info-base',
      'group-[.info]:hover:border-info-border-hover group-[.info]:hover:bg-info-bg-subtle',
      'group-[.info]:focus-visible:ring-info-focus-ring',
      'group-[.success]:border-success-border group-[.success]:bg-success-base',
      'group-[.success]:hover:border-success-border-hover group-[.success]:hover:bg-success-bg-subtle',
      'group-[.success]:focus-visible:ring-success-focus-ring',
      'group-[.warning]:border-warning-border group-[.warning]:bg-warning-base',
      'group-[.warning]:hover:border-warning-border-hover group-[.warning]:hover:bg-warning-bg-subtle',
      'group-[.warning]:focus-visible:ring-warning-focus-ring',
      'group-[.error]:border-error-border group-[.error]:bg-error-base',
      'group-[.error]:hover:border-error-border-hover group-[.error]:hover:bg-error-bg-subtle',
      'group-[.error]:focus-visible:ring-error-focus-ring',
    ),
    close: clsx(
      'absolute right-1 top-1 rounded-md p-1 text-grey-text opacity-0 outline-none transition duration-200',
      'hover:text-grey-text-contrast',
      'focus-visible:opacity-100 focus-visible:ring-4 focus-visible:ring-grey-focus-ring',
      'group-hover:opacity-100',
      'group-[.info]:text-info-focus-ring',
      'group-[.info]:hover:text-info-solid',
      'group-[.info]:focus-visible:ring-info-focusRing',
      'group-[.success]:text-success-focus-ring',
      'group-[.success]:hover:text-success-solid',
      'group-[.success]:focus-visible:ring-success-focus-ring',
      'group-[.warning]:text-warning-focus-ring',
      'group-[.warning]:hover:text-warning-solid',
      'group-[.warning]:focus-visible:ring-warning-focus-ring',
      'group-[.error]:text-error-focus-ring',
      'group-[.error]:hover:text-error-solid',
      'group-[.error]:focus:ring-error-focus-ring',
    ),
    description: 'text-sm text-grey-text',
    title: clsx('text-sm font-semibold', '[&+div]:text-xs'),
    viewport: clsx(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4',
      'sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col',
      'md:max-w-md',
    ),
    toasterHeader: 'grid w-full gap-1',
  },
  variants: {
    intent: {
      default: { base: 'border-grey-line bg-grey-base' },
      info: { base: 'info border-info-line bg-info-base text-info-solid' },
      success: {
        base: 'success border-success-line bg-success-base text-success-solid',
      },
      warning: {
        base: 'warning border-warning-line bg-warning-base text-warning-solid',
      },
      error: { base: 'error border-error-line bg-error-base text-error-solid' },
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

const { base, action, close, description, title, viewport, toasterHeader } =
  toastStyles();

type ToastRef = React.ElementRef<typeof Root>;
type ToastRadixProps = React.ComponentPropsWithoutRef<typeof Root>;
type ToastVariants = VariantProps<typeof toastStyles>;
export type ToastProps = object & ToastRadixProps & ToastVariants;

/**
 * Toast component that displays a toast notification.
 *
 * @param {ToastProps} props - The props for the Toast component.
 * @param {string} [intent='default'] - The visual style of the toast (e.g., 'default', 'info', 'success', 'warning', 'error').
 *
 * @example
 * ```ts
 * toast({
 *   title: 'Scheduled: Catch up',
 *   description: 'Friday, February 10, 2023 at 5:57 PM',
 * });
 * ```
 *
 * @see {@link https://dub.sh/ui-toast Toast Docs} for further information.
 */
export const Toast = forwardRef<ToastRef, ToastProps>(
  ({ intent, className, ...props }, ref) => (
    <Root ref={ref} className={base({ className, intent })} {...props} />
  ),
);

Toast.displayName = Root.displayName;

type ToastActionElement = React.ReactElement<typeof Action>;
type ToastActionRef = React.ElementRef<typeof Action>;
type ToastActionProps = React.ComponentProps<typeof Action>;

/**
 * ToastAction component that represents an action button within the toast.
 *
 * @param {ToastActionProps} props - The props for the ToastAction component.
 *
 * @example
 * ```tsx
 * <ToastAction onClick={handleClick}>Undo</ToastAction>
 * ```
 */
export const ToastAction = forwardRef<ToastActionRef, ToastActionProps>(
  ({ className, ...props }, ref) => (
    <Action ref={ref} className={action({ className })} {...props} />
  ),
);

ToastAction.displayName = Action.displayName;

type ToastCloseRef = React.ElementRef<typeof Close>;
type ToastCloseProps = React.ComponentPropsWithoutRef<typeof Close>;

/**
 * ToastClose component that allows the user to close the toast.
 *
 * @param {ToastCloseProps} props - The props for the ToastClose component.
 *
 * @example
 * ```tsx
 * <ToastClose />
 * ```
 */
export const ToastClose = forwardRef<ToastCloseRef, ToastCloseProps>(
  ({ className, ...props }, ref) => (
    <Close ref={ref} className={close({ className })} {...props}>
      <Cross2Icon className='h-4 w-4' />
    </Close>
  ),
);

ToastClose.displayName = Close.displayName;

type ToastDescriptionRef = React.ElementRef<typeof Description>;
type ToastDescriptionProps = React.ComponentPropsWithoutRef<typeof Description>;

/**
 * ToastDescription component that provides additional information about the toast.
 *
 * @param {ToastDescriptionProps} props - The props for the ToastDescription component.
 *
 * @example
 * ```tsx
 * <ToastDescription>Details about the toast notification.</ToastDescription>
 * ```
 */
export const ToastDescription = forwardRef<
  ToastDescriptionRef,
  ToastDescriptionProps
>(({ className, ...props }, ref) => (
  <Description ref={ref} className={description({ className })} {...props} />
));

ToastDescription.displayName = Description.displayName;

/**
 * ToastProvider component that provides context for managing toasts.
 *
 * @param {React.ComponentProps<typeof Provider>} props - The props for the ToastProvider component.
 *
 * @example
 * ```tsx
 * <ToastProvider>{Toasts will be rendered here}</ToastProvider>
 * ```
 */
export const ToastProvider = Provider;

type ToastTitleRef = React.ElementRef<typeof Title>;
type ToastTitleProps = React.ComponentPropsWithoutRef<typeof Title>;

/**
 * ToastTitle component that displays the title of the toast.
 *
 * @param {ToastTitleProps} props - The props for the ToastTitle component.
 *
 * @example
 * ```tsx
 * <ToastTitle>Notification Title</ToastTitle>
 * ```
 */
export const ToastTitle = forwardRef<ToastTitleRef, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <Title ref={ref} className={title({ className })} {...props} />
  ),
);

ToastTitle.displayName = Title.displayName;

type ToastViewportRef = React.ElementRef<typeof Viewport>;
type ToastViewportProps = React.ComponentPropsWithoutRef<typeof Viewport>;

/**
 * ToastViewport component that defines the area where toasts are displayed.
 *
 * @param {ToastViewportProps} props - The props for the ToastViewport component.
 *
 * @example
 * ```tsx
 * <ToastViewport />
 * ```
 */
export const ToastViewport = forwardRef<ToastViewportRef, ToastViewportProps>(
  ({ className, ...props }, ref) => (
    <Viewport ref={ref} className={viewport({ className })} {...props} />
  ),
);

ToastViewport.displayName = Viewport.displayName;

/**
 * Toaster component that renders toast notifications.
 *
 * @example
 * ```tsx
 * <Toaster />
 * ```
 */
export const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className={toasterHeader()}>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const _ACTION_TYPES = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;

const genId = () => {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
};

type ActionType = typeof _ACTION_TYPES;

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

type State = {
  toasts: ToasterToast[];
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: ((state: State) => void)[] = [];

let memoryState: State = { toasts: [] };

const dispatch = (action: Action) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

type Toast = Omit<ToasterToast, 'id'>;

/**
 * toast function that triggers a toast notification.
 *
 * @param {Toast} props - The properties for the toast notification, including title and description.
 *
 * @example
 * ```ts
 * const { toast } = useToast();
 * toast({
 *   title: 'Scheduled: Catch up',
 *   description: 'Friday, February 10, 2023 at 5:57 PM',
 * });
 * ```
 */
export const toast = ({ ...props }: Toast) => {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
};

/**
 * useToast hook that provides access to the current toast state and methods to manage toasts.
 *
 * @example
 * ```ts
 * const { toast } = useToast();
 * toast({
 *   title: 'New message!',
 *   description: 'You have received a new message.',
 * });
 * ```
 */
export const useToast = () => {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
};
