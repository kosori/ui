'use client';

import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Fallback, Image, Root } from '@radix-ui/react-avatar';
import { tv } from 'tailwind-variants';

import { cn } from '@kosori/ui';

const avatarStyles = tv({
  base: cn('relative flex shrink-0 overflow-hidden'),
  variants: {
    shape: {
      round: 'rounded-full',
      square: '',
    },
    size: {
      small: 'h-8 w-8',
      medium: 'h-10 w-10',
      large: 'h-12 w-12',
    },
  },
  defaultVariants: {
    shape: 'round',
    size: 'small',
  },
  compoundVariants: [
    {
      shape: 'square',
      size: 'small',
      className: 'rounded-lg',
    },
    {
      shape: 'square',
      size: 'medium',
      className: 'rounded-xl',
    },
    {
      shape: 'square',
      size: 'large',
      className: 'rounded-2xl',
    },
  ],
});

// --- Component:Avatar ---
type AvatarRef = React.ElementRef<typeof Root>;
type AvatarRadixProps = React.ComponentPropsWithoutRef<typeof Root>;
type AvatarVariants = VariantProps<typeof avatarStyles>;
type AvatarProps = {
  /**
   * The shape of the avatar
   * @default 'round'
   * @see {@link https://dub.sh/XuNhEXJ Avatar Docs} for available options.
   */
  shape?: AvatarVariants['shape'];
  /**
   * The size of the Avatar.
   * @default 'small'
   * @see {@link https://dub.sh/XuNhEXJ Avatar Docs} for available options.
   */
  size?: AvatarVariants['size'];
} & AvatarRadixProps;

/**
 * Contains all the parts of an avatar
 *
 * @param {object} props - The props for the Avatar component.
 * @param {string} [props.shape='round'] - The shape of the avatar (either 'square' or 'round').
 * @param {string} [props.size='small'] - The size of the avatar (e.g., 'small', 'medium', 'large').
 * @see {@link https://dub.sh/XuNhEXJ Avatar Docs} for further information.
 */
export const Avatar = forwardRef<AvatarRef, AvatarProps>(
  ({ shape, size, className, ...props }, ref) => (
    <Root
      ref={ref}
      className={avatarStyles({ shape, size, class: className })}
      {...props}
    />
  ),
);

Avatar.displayName = Root.displayName;

// --- Component:AvatarImage ---
type AvatarImageRef = React.ElementRef<typeof Image>;
type AvatarImageProps = React.ComponentPropsWithoutRef<typeof Image>;

export const AvatarImage = forwardRef<AvatarImageRef, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  ),
);

AvatarImage.displayName = Image.displayName;

// --- Component:AvatarFallback ---
type AvatarFallbackRef = React.ElementRef<typeof Fallback>;
type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof Fallback>;

export const AvatarFallback = forwardRef<
  AvatarFallbackRef,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center bg-grey-bg-subtle',
      className,
    )}
    {...props}
  />
));

AvatarFallback.displayName = Fallback.displayName;
