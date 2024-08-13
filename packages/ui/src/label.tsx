'use client';

import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Root } from '@radix-ui/react-label';
import { tv } from 'tailwind-variants';

import { cn } from '@kosori/ui';

const labelVariants = tv({
  base: cn(
    'text-sm font-medium leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:text-grey-solid',
  ),
});

type LabelRef = React.ElementRef<typeof Root>;
type LabelRadixProps = React.ComponentPropsWithoutRef<typeof Root>;
type LabelVariants = VariantProps<typeof labelVariants>;
type LabelProps = LabelRadixProps & LabelVariants;

/**
 * Label component that provides a label for form elements.
 *
 * @param {LabelProps} props - The props for the Label component.
 *
 * @example
 * <Label htmlFor='email'>Your email address</Label>
 *
 * @see {@link https://dub.sh/ui-label Label Docs} for further information.
 */

export const Label = forwardRef<LabelRef, LabelProps>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={labelVariants({ class: className })}
      {...props}
    />
  ),
);

Label.displayName = Root.displayName;
