'use client';

import { Root } from '@radix-ui/react-aspect-ratio';

/**
 * AspectRatio component that maintains a specified aspect ratio for its children.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - Additional props to pass to the aspect ratio container.
 *
 * @example
 * <AspectRatio ratio={16 / 9}>
 *     <Image src="..." alt="..." />
 * </AspectRatio>
 *
 * @see {@link https://dub.sh/ui-aspect-ratio Aspect Ratio Docs} for further information.
 */
export const AspectRatio = Root;
