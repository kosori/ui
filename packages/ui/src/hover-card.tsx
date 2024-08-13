'use client';

import { forwardRef } from 'react';
import { Content, Portal, Root, Trigger } from '@radix-ui/react-hover-card';

import { cn } from '@kosori/ui';

/**
 * HoverCard component that serves as a container for the hover card functionality.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the HoverCard component.
 *
 * @example
 * <HoverCard>
 *   <HoverCardTrigger>Hover</HoverCardTrigger>
 *   <HoverCardContent>
 *     The React Framework.
 *   </HoverCardContent>
 * </HoverCard>
 *
 * @see {@link https://dub.sh/ui-hover-card HoverCard Docs} for further information.
 */
export const HoverCard = Root;

/**
 * HoverCardTrigger component that triggers the hover card when hovered over.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Trigger>} props - The props for the HoverCardTrigger component.
 *
 * @example
 * <HoverCardTrigger>Hover</HoverCardTrigger>
 */
export const HoverCardTrigger = Trigger;

/**
 * HoverCardPortal component that renders the hover card content in a portal.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Portal>} props - The props for the HoverCardPortal component.
 *
 * @example
 * <HoverCardPortal>
 *   <HoverCardContent>
 *     The React Framework – created and maintained by @vercel.
 *   </HoverCardContent>
 * </HoverCardPortal>
 */
export const HoverCardPortal = Portal;

type HoverCardContentRef = React.ElementRef<typeof Content>;
type HoverCardContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * HoverCardContent component that displays the content of the hover card.
 *
 * @param {HoverCardContentProps} props - The props for the HoverCardContent component.
 * @param {'start' | 'center' | 'end'} [align='center'] - The alignment of the content.
 * @param {number} [sideOffset=4] - The offset from the side.
 *
 * @example
 * <>
 *   <HoverCardContent>
 *     The React Framework – created and maintained by @vercel.
 *   </HoverCardContent>
 * </>
 *
 * @see {@link https://dub.sh/ui-hover-card-content HoverCardContent Docs} for further information.
 */
export const HoverCardContent = forwardRef<
  HoverCardContentRef,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <Content
    ref={ref}
    align={align}
    className={cn(
      'z-50 rounded-lg border border-grey-line bg-grey-base p-4 shadow-md outline-none',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    sideOffset={sideOffset}
    {...props}
  />
));

HoverCardContent.displayName = Content.displayName;
