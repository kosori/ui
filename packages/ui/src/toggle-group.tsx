'use client';

import type { VariantProps } from 'tailwind-variants';
import { createContext, forwardRef, useContext } from 'react';
import { Item, Root } from '@radix-ui/react-toggle-group';
import { tv } from 'tailwind-variants';

import type { ToggleVariants } from '@kosori/ui/toggle';
import { toggleStyles } from '@kosori/ui/toggle';

const toggleGroupStyles = tv({
  slots: {
    base: 'flex items-center justify-center gap-1',
  },
});

const { base } = toggleGroupStyles();

type ToggleGroupRef = React.ElementRef<typeof Root>;
type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof Root> &
  ToggleVariants;

/**
 * ToggleGroup component that serves as a container for toggle items.
 *
 * @param {ToggleGroupProps} props - The props for the ToggleGroup component.
 * @param {'ghost' | 'outline'} [variant='solid'] - The visual style of the toggle group (e.g. 'ghost', 'outline').
 * @param {'small' | 'medium' | 'large'} [size='medium'] - The size of the toggle group (e.g. 'small', 'medium', 'large').
 *
 * @example
 * <ToggleGroup type='single'>
 *   <ToggleGroupItem value='a'>A</ToggleGroupItem>
 *   <ToggleGroupItem value='b'>B</ToggleGroupItem>
 *   <ToggleGroupItem value='c'>C</ToggleGroupItem>
 * </ToggleGroup>
 *
 * @see {@link https://dub.sh/ui-toggle-group ToggleGroup Docs} for further information.
 */
export const ToggleGroup = forwardRef<ToggleGroupRef, ToggleGroupProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <Root ref={ref} className={base({ className })} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </Root>
  ),
);

ToggleGroup.displayName = Root.displayName;

/**
 * ToggleGroupContext component that provides context for the toggle group items.
 *
 * @param {VariantProps<typeof toggleStyles>} props - The props for the ToggleGroupContext.
 *
 * @example
 * const context = useContext(ToggleGroupContext);
 */
export const ToggleGroupContext = createContext<
  VariantProps<typeof toggleStyles>
>({
  size: 'medium',
  variant: 'ghost',
  icon: false,
});

type ToggleGroupItemRef = React.ElementRef<typeof Item>;
type ToggleGroupItemProps = React.ComponentPropsWithRef<typeof Item> &
  ToggleVariants;

/**
 * ToggleGroupItem component that represents an individual toggle item within the group.
 *
 * @param {ToggleGroupItemProps} props - The props for the ToggleGroupItem component.
 *
 * @example
 * <ToggleGroupItem value='a'>A</ToggleGroupItem>
 */
export const ToggleGroupItem = forwardRef<
  ToggleGroupItemRef,
  ToggleGroupItemProps
>(({ className, children, variant, size, icon, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  return (
    <Item
      ref={ref}
      className={toggleStyles({
        variant: context.variant ?? variant,
        size: context.size ?? size,
        icon: context.icon ?? icon,
        class: className,
      })}
      {...props}
    >
      {children}
    </Item>
  );
});

ToggleGroupItem.displayName = Item.displayName;
