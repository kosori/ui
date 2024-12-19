import { forwardRef } from 'react';
import { Content, Provider, Root, Trigger } from '@radix-ui/react-tooltip';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const tooltipStyles = tv({
  slots: {
    content: clsx(
      'z-50 overflow-hidden rounded-lg border border-grey-line bg-grey-base px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
    ),
  },
});

const { content } = tooltipStyles();

/**
 * TooltipProvider component that provides context for tooltips.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Provider>} props - The props for the TooltipProvider component.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover</TooltipTrigger>
 *     <TooltipContent>
 *       <p>Add to library</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
export const TooltipProvider = Provider;

/**
 * Tooltip component that serves as a container for the tooltip content.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the Tooltip component.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover</TooltipTrigger>
 *   <TooltipContent>Tooltip text</TooltipContent>
 * </Tooltip>
 * ```
 */
export const Tooltip = Root;

/**
 * TooltipTrigger component that triggers the display of the tooltip content.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Trigger>} props - The props for the TooltipTrigger component.
 *
 * @example
 * ```tsx
 * <TooltipTrigger>Hover me</TooltipTrigger>
 * ```
 */
export const TooltipTrigger = Trigger;

type Ref = React.ElementRef<typeof Content>;
type Props = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * TooltipContent component that displays the content of the tooltip.
 *
 * @param {Props} props - The props for the TooltipContent component.
 *
 * @example
 * ```tsx
 * <TooltipContent>
 *   <p>Tooltip description</p>
 * </TooltipContent>
 * ```
 */
export const TooltipContent = forwardRef<Ref, Props>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Content
      ref={ref}
      className={content({ className })}
      sideOffset={sideOffset}
      {...props}
    />
  ),
);

TooltipContent.displayName = Content.displayName;
