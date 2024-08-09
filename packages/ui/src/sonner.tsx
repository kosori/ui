'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

import { cn } from '@kosori/ui';

// --- Component:Toaster ---
type ToasterProps = React.ComponentProps<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      className='toaster group'
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          toast: cn(
            'toast group',
            'group-[.toaster]:border-grey-line group-[.toaster]:bg-grey-base group-[.toaster]:text-grey-text-contrast group-[.toaster]:shadow-lg',
          ),
          description: 'group-[.toast]:text-grey-text',
          actionButton: cn(
            'group-[.toast]:data-[button]:h-8 group-[.toast]:data-[button]:rounded-lg group-[.toast]:data-[button]:bg-primary-solid group-[.toast]:data-[button]:px-2.5 group-[.toast]:data-[button]:text-grey-base group-[.toast]:data-[button]:transition-colors group-[.toast]:data-[button]:duration-200',
            'group-[.toast]:data-[button]:hover:bg-primary-solid-hover',
            'group-[.toast]:data-[button]:focus-visible:ring-4 group-[.toast]:data-[button]:focus-visible:ring-primary-focus-ring',
          ),
          cancelButton: cn(
            'group-[.toast]:data-[button]:h-8 group-[.toast]:data-[button]:rounded-lg group-[.toast]:data-[button]:border group-[.toast]:data-[button]:border-solid group-[.toast]:data-[button]:border-grey-border group-[.toast]:data-[button]:bg-grey-base group-[.toast]:data-[button]:px-2.5 group-[.toast]:data-[button]:text-grey-text-contrast group-[.toast]:data-[button]:transition-colors group-[.toast]:data-[button]:duration-200',
            'group-[.toast]:data-[button]:hover:border-grey-border-hover group-[.toast]:data-[button]:hover:bg-grey-bg-subtle',
            'group-[.toast]:data-[button]:active:bg-grey-bg',
            'group-[.toast]:data-[button]:focus-visible:ring-4 group-[.toast]:data-[button]:focus-visible:ring-grey-focus-ring',
          ),
        },
      }}
      {...props}
    />
  );
};