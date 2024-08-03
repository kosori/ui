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

import { cn } from '@kosori/ui';

// -- Component:Accordion --
export const Accordion = Root;

// --- Component:AccordionItem ---
type AccordionItemRef = React.ElementRef<typeof Item>;
type AccordionItemProps = React.ComponentPropsWithoutRef<typeof Item>;

export const AccordionItem = forwardRef<AccordionItemRef, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <Item
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-grey-border bg-grey-base transition-colors duration-200',
        'focus-within:outline focus-within:outline-primary-focus-ring',
        'hover:border-grey-border-hover',
        'data-[disabled]:border-grey-line',
        'data-[disabled]:hover:border-grey-line',
        className,
      )}
      {...props}
    />
  ),
);

AccordionItem.displayName = 'AccordionItem';

// --- Component:AccordionTrigger ---
type Ref = React.ElementRef<typeof Trigger>;
type Props = React.ComponentPropsWithoutRef<typeof Trigger>;

export const AccordionTrigger = forwardRef<Ref, Props>(
  ({ className, children, ...props }, ref) => (
    <Header className='flex'>
      <Trigger
        ref={ref}
        className={cn(
          'group flex h-10 flex-1 items-center justify-between px-4 text-sm font-medium outline-none',
          'data-[disabled]:text-grey-solid',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className={cn(
            'h-5 w-5 transition-transform duration-200 ease-in-out',
            'group-data-[state=open]:rotate-180',
          )}
        />
      </Trigger>
    </Header>
  ),
);

AccordionTrigger.displayName = 'AccordionTrigger';

// --- Component:AccordionContent ---
type AccordionContentRef = React.ElementRef<typeof Content>;
type AccordionProps = React.ComponentPropsWithoutRef<typeof Content>;

export const AccordionContent = forwardRef<AccordionContentRef, AccordionProps>(
  ({ className, children, ...props }, ref) => (
    <Content
      ref={ref}
      className={cn(
        'overflow-hidden text-sm text-grey-text',
        'data-[disabled]:text-grey-solid',
        'data-[state=closed]:animate-accordion-up',
        'data-[state=open]:animate-accordion-down',
        className,
      )}
      {...props}
    >
      <div className='px-4 pb-2'>{children}</div>
    </Content>
  ),
);

AccordionContent.displayName = 'AccordionContent';
