'use client';

import { Dialog as CommandDialogPrimitive } from '@base-ui/react/dialog';
import { IconSearch } from '@tabler/icons-react';
import { cn } from 'cn';
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
} from 'motion/react';
import type * as React from 'react';
import { createContext, useContext } from 'react';
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteSeparator,
} from '@/components/ui/autocomplete';
import { motionTokens, useControllableOpen } from '@/lib/motion';

const CommandDialogOpenContext = createContext<boolean | null>(null);

/** Resolve a Command's open state so its popup can exit before unmounting. */
export function CommandDialog<Payload = unknown>({
  children,
  defaultOpen,
  onOpenChange,
  open,
  ...props
}: CommandDialogPrimitive.Root.Props<Payload>): React.ReactElement {
  const commandDialog =
    useControllableOpen<CommandDialogPrimitive.Root.ChangeEventDetails>({
      defaultOpen,
      onOpenChange,
      open,
    });

  return (
    <CommandDialogOpenContext.Provider value={commandDialog.open}>
      <CommandDialogPrimitive.Root
        onOpenChange={commandDialog.setOpen}
        open={commandDialog.open}
        {...props}
      >
        {children}
      </CommandDialogPrimitive.Root>
    </CommandDialogOpenContext.Provider>
  );
}

export const CommandDialogPortal: typeof CommandDialogPrimitive.Portal =
  CommandDialogPrimitive.Portal;

export const CommandCreateHandle: typeof CommandDialogPrimitive.createHandle =
  CommandDialogPrimitive.createHandle;

export function CommandDialogTrigger(
  props: CommandDialogPrimitive.Trigger.Props
): React.ReactElement {
  return (
    <CommandDialogPrimitive.Trigger
      data-slot='command-dialog-trigger'
      {...props}
    />
  );
}

export function CommandDialogBackdrop({
  className,
  render,
  ...props
}: CommandDialogPrimitive.Backdrop.Props): React.ReactElement {
  const transition = motionTokens.spring.snappy;

  return (
    <CommandDialogPrimitive.Backdrop
      className={cn(
        'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm supports-[-webkit-touch-callout:none]:absolute',
        className
      )}
      data-slot='command-dialog-backdrop'
      render={
        render ?? (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={transition}
          />
        )
      }
      {...props}
    />
  );
}

export function CommandDialogViewport({
  className,
  ...props
}: CommandDialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <CommandDialogPrimitive.Viewport
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center px-4 py-[max(--spacing(4),4vh)] sm:py-[10vh]',
        className
      )}
      data-slot='command-dialog-viewport'
      {...props}
    />
  );
}

export function CommandDialogPopup({
  className,
  children,
  portalProps,
  render,
  ...props
}: CommandDialogPrimitive.Popup.Props & {
  portalProps?: CommandDialogPrimitive.Portal.Props;
}): React.ReactElement {
  const open = useContext(CommandDialogOpenContext);
  const reduce = useReducedMotion();
  const transition = motionTokens.spring.snappy;
  const scale = reduce ? 1 : 0.98;

  const popup = (
    <CommandDialogPortal keepMounted={open !== null} {...portalProps}>
      <CommandDialogBackdrop />
      <CommandDialogViewport>
        <CommandDialogPrimitive.Popup
          className={cn(
            'relative row-start-2 flex max-h-105 min-h-0 w-full min-w-0 max-w-xl -translate-y-[calc(1.25rem*var(--nested-dialogs))] scale-[calc(1-0.1*var(--nested-dialogs))] flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72 before:shadow-[0_1px_--theme(--color-black/4%)] data-nested-dialog-open:origin-top **:data-[slot=scroll-area-viewport]:data-has-overflow-y:pe-1 motion-reduce:scale-100 motion-reduce:transition-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
            className
          )}
          data-slot='command-dialog-popup'
          render={
            render ??
            ((elementProps, state) => (
              <motion.div
                {...(elementProps as HTMLMotionProps<'div'>)}
                animate={{
                  opacity: state.open && !state.nestedDialogOpen ? 1 : 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale }}
                initial={{ opacity: 0, scale }}
                transition={transition}
              />
            ))
          }
          {...props}
        >
          {children}
        </CommandDialogPrimitive.Popup>
      </CommandDialogViewport>
    </CommandDialogPortal>
  );

  if (open === null) {
    return popup;
  }

  return <AnimatePresence>{open && popup}</AnimatePresence>;
}

export function Command({
  autoHighlight = 'always',
  keepHighlight = true,
  ...props
}: React.ComponentProps<typeof Autocomplete>): React.ReactElement {
  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      inline
      keepHighlight={keepHighlight}
      open
      {...props}
    />
  );
}

export function CommandInput({
  className,
  placeholder,
  ...props
}: React.ComponentProps<typeof AutocompleteInput>): React.ReactElement {
  return (
    <div className='px-2.5 py-1.5'>
      <AutocompleteInput
        autoFocus
        className={cn(
          'border-transparent! bg-transparent! shadow-none before:hidden has-focus-visible:ring-0',
          className
        )}
        placeholder={placeholder}
        size='lg'
        startAddon={<IconSearch />}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteList>): React.ReactElement {
  return (
    <AutocompleteList
      className={cn('not-empty:scroll-py-2 not-empty:p-2', className)}
      data-slot='command-list'
      {...props}
    />
  );
}

export function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteEmpty>): React.ReactElement {
  return (
    <AutocompleteEmpty
      className={cn('not-empty:py-6', className)}
      data-slot='command-empty'
      {...props}
    />
  );
}

export function CommandPanel({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        'relative -mx-px not-has-[+[data-slot=command-footer]]:-mb-px min-h-0 rounded-t-xl not-has-[+[data-slot=command-footer]]:rounded-b-2xl border border-b-0 bg-popover bg-clip-padding shadow-xs/5 [clip-path:inset(0_1px)] not-has-[+[data-slot=command-footer]]:[clip-path:inset(0_1px_1px_1px_round_0_0_calc(var(--radius-2xl)-1px)_calc(var(--radius-2xl)-1px))] before:pointer-events-none before:absolute before:inset-0 before:rounded-t-[calc(var(--radius-xl)-1px)] **:data-[slot=scroll-area-scrollbar]:mt-2',
        className
      )}
      {...props}
    />
  );
}

export function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteGroup>): React.ReactElement {
  return (
    <AutocompleteGroup
      className={className}
      data-slot='command-group'
      {...props}
    />
  );
}

export function CommandGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteGroupLabel>): React.ReactElement {
  return (
    <AutocompleteGroupLabel
      className={className}
      data-slot='command-group-label'
      {...props}
    />
  );
}

export const CommandCollection = AutocompleteCollection;

export function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteItem>): React.ReactElement {
  return (
    <AutocompleteItem
      className={cn('py-1.5', className)}
      data-slot='command-item'
      {...props}
    />
  );
}

export function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteSeparator>): React.ReactElement {
  return (
    <AutocompleteSeparator
      className={cn('my-2', className)}
      data-slot='command-separator'
      {...props}
    />
  );
}

export function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'kbd'>): React.ReactElement {
  return (
    <kbd
      className={cn(
        'ms-auto font-medium font-sans text-muted-foreground/72 text-xs tracking-widest',
        className
      )}
      data-slot='command-shortcut'
      {...props}
    />
  );
}

export function CommandFooter({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 rounded-b-[calc(var(--radius-2xl)-1px)] border-t px-5 py-3 text-muted-foreground text-xs',
        className
      )}
      data-slot='command-footer'
      {...props}
    />
  );
}

const Primitive = CommandDialogPrimitive;

export { Primitive as CommandDialogPrimitive };
