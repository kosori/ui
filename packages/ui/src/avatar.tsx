'use client';

import type { VariantProps } from 'tailwind-variants';
import { forwardRef } from 'react';
import { Fallback, Image, Root } from '@radix-ui/react-avatar';
import { tv } from 'tailwind-variants';

const avatarStyles = tv({
  slots: {
    base: 'relative flex shrink-0 overflow-hidden',
    image: 'aspect-square w-full h-full',
    fallback:
      'flex h-full w-full items-center justify-center bg-grey-bg-subtle',
  },
  variants: {
    shape: {
      round: { base: 'rounded-full' },
      square: { base: '' },
    },
    size: {
      small: { base: 'size-8' },
      medium: { base: 'size-10' },
      large: { base: 'size-12' },
    },
  },
  compoundVariants: [
    {
      shape: 'square',
      size: 'small',
      className: { base: 'rounded-lg' },
    },
    {
      shape: 'square',
      size: 'medium',
      className: { base: 'rounded-xl' },
    },
    {
      shape: 'square',
      size: 'large',
      className: { base: 'rounded-2xl' },
    },
  ],
  defaultVariants: {
    shape: 'round',
    size: 'small',
  },
});

const { base, image, fallback } = avatarStyles();

type AvatarRef = React.ElementRef<typeof Root>;
type AvatarRadixProps = React.ComponentPropsWithoutRef<typeof Root>;
type AvatarVariants = VariantProps<typeof avatarStyles>;
type AvatarProps = AvatarVariants & AvatarRadixProps;

/**
 * Avatar component that displays a user's image or a fallback if the image is not available.
 *
 * @param {AvatarProps} props - The props for the Avatar component.
 * @param {'round' | 'square'} [shape='round'] - The shape of the avatar (e.g., 'round', 'square').
 * @param {'small' | 'medium' | 'large'} [size='small'] - The size of the avatar (e.g., 'small', 'medium', 'large').
 *
 * @example
 * <Avatar>
 *   <AvatarImage src='https://github.com/codingcodax.png' />
 *   <AvatarFallback>CC</AvatarFallback>
 * </Avatar>
 *
 * @see {@link https://dub.sh/ui-avatar Avatar Docs} for further information.
 */
export const Avatar = forwardRef<AvatarRef, AvatarProps>(
  ({ shape, size, className, ...props }, ref) => (
    <Root ref={ref} className={base({ className, shape, size })} {...props} />
  ),
);

Avatar.displayName = Root.displayName;

type AvatarImageRef = React.ElementRef<typeof Image>;
type AvatarImageProps = React.ComponentPropsWithoutRef<typeof Image>;

/**
 * AvatarImage component for the Avatar that displays the user's image.
 *
 * @param {AvatarImageProps} props - Additional props to pass to the AvatarImage component.
 *
 * @example
 * <AvatarImage src='https://github.com/codingcodax.png' />
 */
export const AvatarImage = forwardRef<AvatarImageRef, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <Image ref={ref} className={image({ className })} {...props} />
  ),
);

AvatarImage.displayName = Image.displayName;

type AvatarFallbackRef = React.ElementRef<typeof Fallback>;
type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof Fallback>;

/**
 * AvatarFallback component for the Avatar that displays when the image is not available.
 *
 * @param {AvatarFallbackProps} props - Additional props to pass to the AvatarFallback component.
 *
 * @example
 * <AvatarFallback>CC</AvatarFallback>
 */
export const AvatarFallback = forwardRef<
  AvatarFallbackRef,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <Fallback ref={ref} className={fallback({ className })} {...props} />
));

AvatarFallback.displayName = Fallback.displayName;
