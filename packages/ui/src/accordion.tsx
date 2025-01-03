'use client';

import { forwardRef } from 'react';
import {
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { tv } from 'tailwind-variants';

const accordionStyles = tv({
  slots: {
    item: clsx(
      'w-full rounded-lg border border-grey-border bg-grey-base transition-colors duration-200',
      'focus-within:outline focus-within:outline-primary-focus-ring',
      'hover:border-grey-border-hover',
      'data-[disabled]:cursor-not-allowed data-[disabled]:border-grey-line',
      'data-[disabled]:hover:border-grey-line',
    ),
    trigger: clsx(
      'group flex min-h-10 flex-1 items-center justify-between px-4 py-2 text-start text-sm font-medium text-grey-text-contrast outline-none',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
    ),
    triggerIcon: clsx(
      'size-4 transition-transform duration-200 ease-in-out',
      'group-data-[state=open]:rotate-180',
    ),
    content: clsx(
      'overflow-hidden text-sm text-grey-text',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-grey-solid',
      'data-[state=closed]:animate-accordion-up',
      'data-[state=open]:animate-accordion-down',
    ),
  },
});

const { item, trigger, triggerIcon, content } = accordionStyles();

/**
 * Accordion component that allows for collapsible content sections.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - Additional props to pass to the accordion container.
 *
 * @example
 * ```tsx
 * <Accordion type='single' collapsible>
 *   <AccordionItem value='item-1'>
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>
 *       Yes. It adheres to the WAI-ARIA design pattern.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * @see {@link https://dub.sh/ui-accordion Accordion Docs} for further information.
 */
export const Accordion = Root;

type AccordionItemRef = React.ElementRef<typeof Item>;
type AccordionItemProps = React.ComponentPropsWithoutRef<typeof Item>;

/**
 * AccordionItem component that represents a single collapsible section within the Accordion.
 *
 * @param {AccordionItemProps} props - Additional props to pass to the accordion item.
 *
 * @example
 * ```tsx
 * <AccordionItem value='item-1'>
 *   <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *   <AccordionContent>
 *     Yes. It adheres to the WAI-ARIA design pattern.
 *   </AccordionContent>
 * </AccordionItem>
 * ```
 */
export const AccordionItem = forwardRef<AccordionItemRef, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <Item ref={ref} className={item({ className })} {...props} />
  ),
);

AccordionItem.displayName = 'AccordionItem';

type AccordionTriggerRef = React.ElementRef<typeof Trigger>;
type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;

/**
 * AccordionTrigger component that acts as the clickable header for an AccordionItem.
 *
 * @param {AccordionTriggerProps} props - Additional props to pass to the accordion trigger.
 *
 * @example
 * ```tsx
 * <AccordionTrigger>Is it accessible?</AccordionTrigger>
 * ```
 */
export const AccordionTrigger = forwardRef<
  AccordionTriggerRef,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <Header className='flex'>
    <Trigger ref={ref} className={trigger({ className })} {...props}>
      {children}
      <ChevronDownIcon className={triggerIcon()} />
    </Trigger>
  </Header>
));

AccordionTrigger.displayName = 'AccordionTrigger';

type AccordionContentRef = React.ElementRef<typeof Content>;
type AccordionContentProps = React.ComponentPropsWithoutRef<typeof Content>;

/**
 * AccordionContent component that displays the content of an AccordionItem.
 *
 * @param {AccordionContentProps} props - Additional props to pass to the accordion content.
 *
 * @example
 * ```tsx
 * <AccordionContent>
 *   Yes. It adheres to the WAI-ARIA design pattern.
 * </AccordionContent>
 * ```
 */
export const AccordionContent = forwardRef<
  AccordionContentRef,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <Content ref={ref} className={content({ className })} {...props}>
    <div className='p-4'>{children}</div>
  </Content>
));

AccordionContent.displayName = 'AccordionContent';
