'use client';

import type { VariantProps } from 'tailwind-variants';
import { createContext, forwardRef, useContext } from 'react';
import { Item, Root } from '@radix-ui/react-toggle-group';

import type { ToggleVariants } from '@kosori/ui/toggle';
import { cn } from '@kosori/ui';
import { toggleStyles } from '@kosori/ui/toggle';

// --- Component:ToggleGroup ---
type ToggleGroupRef = React.ElementRef<typeof Root>;
type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof Root> &
  ToggleVariants;

export const ToggleGroup = forwardRef<ToggleGroupRef, ToggleGroupProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn('flex items-center justify-center gap-1', className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </Root>
  ),
);

ToggleGroup.displayName = Root.displayName;

// --- Component:ToggleGroupContext ---
export const ToggleGroupContext = createContext<
  VariantProps<typeof toggleStyles>
>({
  size: 'medium',
  variant: 'ghost',
});

// --- Component:ToggleGroupItem ---
type ToggleGroupItemRef = React.ElementRef<typeof Item>;
type ToggleGroupItemProps = React.ComponentPropsWithRef<typeof Item> &
  ToggleVariants;

export const ToggleGroupItem = forwardRef<
  ToggleGroupItemRef,
  ToggleGroupItemProps
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  return (
    <Item
      ref={ref}
      className={toggleStyles({
        variant: context.variant ?? variant,
        size: context.size ?? size,
        class: className,
      })}
      {...props}
    >
      {children}
    </Item>
  );
});

ToggleGroupItem.displayName = Item.displayName;
