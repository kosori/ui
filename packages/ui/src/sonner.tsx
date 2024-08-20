'use client';

import { clsx } from 'clsx/lite';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import { tv } from 'tailwind-variants';

const sonnerStyles = tv({
  slots: {
    base: 'toaster group',
    toast: clsx(
      'toast group',
      'group-[.toaster]:border-grey-line group-[.toaster]:bg-grey-base group-[.toaster]:text-grey-text-contrast group-[.toaster]:shadow-lg',
    ),
    description: 'group-[.toast]:text-grey-text',
    actionButton: clsx(
      'group-[.toast]:data-[button]:h-8 group-[.toast]:data-[button]:rounded-lg group-[.toast]:data-[button]:bg-primary-solid group-[.toast]:data-[button]:px-2.5 group-[.toast]:data-[button]:text-grey-base group-[.toast]:data-[button]:transition-colors group-[.toast]:data-[button]:duration-200',
      'group-[.toast]:data-[button]:hover:bg-primary-solid-hover',
      'group-[.toast]:data-[button]:focus-visible:ring-4 group-[.toast]:data-[button]:focus-visible:ring-primary-focus-ring',
    ),
    cancelButton: clsx(
      'group-[.toast]:data-[button]:h-8 group-[.toast]:data-[button]:rounded-lg group-[.toast]:data-[button]:border group-[.toast]:data-[button]:border-solid group-[.toast]:data-[button]:border-grey-border group-[.toast]:data-[button]:bg-grey-base group-[.toast]:data-[button]:px-2.5 group-[.toast]:data-[button]:text-grey-text-contrast group-[.toast]:data-[button]:transition-colors group-[.toast]:data-[button]:duration-200',
      'group-[.toast]:data-[button]:hover:border-grey-border-hover group-[.toast]:data-[button]:hover:bg-grey-bg-subtle',
      'group-[.toast]:data-[button]:active:bg-grey-bg',
      'group-[.toast]:data-[button]:focus-visible:ring-4 group-[.toast]:data-[button]:focus-visible:ring-grey-focus-ring',
    ),
  },
});

const { base, toast, description, actionButton, cancelButton } = sonnerStyles();

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Toaster component that provides a way to display toast notifications.
 *
 * @param {ToasterProps} props - The props for the Toaster component.
 *
 * @example
 * toast('Event has been created.');
 *
 * @see {@link https://dub.sh/ui-toaster Toaster Docs} for further information.
 */
export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      className={base()}
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          toast: toast(),
          description: description(),
          actionButton: actionButton(),
          cancelButton: cancelButton(),
        },
      }}
      {...props}
    />
  );
};
