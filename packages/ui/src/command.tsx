import type { DialogProps } from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  Command as CMDK,
  CommandEmpty as CMDKEmpty,
  CommandGroup as CMDKGroup,
  CommandInput as CMDKInput,
  CommandItem as CMDKItem,
  CommandList as CMDKList,
  CommandSeparator as CMDKSeparator,
} from 'cmdk';

import { cn } from '@kosori/ui';
import { Dialog, DialogContent } from '@kosori/ui/dialog';

// --- Component:Command ---
type CommandRef = React.ElementRef<typeof CMDK>;
type CommandProps = React.ComponentPropsWithoutRef<typeof CMDK>;

export const Command = forwardRef<CommandRef, CommandProps>(
  ({ className, ...props }, ref) => (
    <CMDK
      ref={ref}
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-xl bg-grey-base',
        className,
      )}
      {...props}
    />
  ),
);

Command.displayName = CMDK.displayName;

// --- Component:CommandDialog ---
type CommandDialogProps = DialogProps;

export const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className='overflow-hidden p-0 shadow-lg'>
        <Command
          className={cn(
            '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-grey-text',
            '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
            '[&_[cmdk-group]]:px-1',
            '[&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5',
            '[&_[cmdk-input]]:h-11',
            '[&_[cmdk-item]]:h-auto [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2',
            '[&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5',
          )}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

// --- Component:CommandInput ---
type CommandInputRef = React.ElementRef<typeof CMDKInput>;
type CommandInputProps = React.ComponentPropsWithoutRef<typeof CMDKInput>;

export const CommandInput = forwardRef<CommandInputRef, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div
      className='flex items-center border-b border-grey-line px-3 outline-none'
      cmdk-input-wrapper=''
    >
      <MagnifyingGlassIcon className='mr-2 h-4 w-4 shrink-0 text-grey-text' />
      <CMDKInput
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-lg bg-grey-base py-3 text-sm',
          'placeholder:text-grey-placeholder-text',
          'focus:outline-none',
          className,
        )}
        {...props}
      />
    </div>
  ),
);

CommandInput.displayName = CMDKInput.displayName;

// --- Component:CommandList ---
type CommandListRef = React.ElementRef<typeof CMDKList>;
type CommandListProps = React.ComponentPropsWithoutRef<typeof CMDKList>;

export const CommandList = forwardRef<CommandListRef, CommandListProps>(
  ({ className, ...props }, ref) => (
    <CMDKList
      ref={ref}
      className={cn(
        'max-h-xs overflow-h-auto h-full overflow-x-hidden outline-none',
        'focus-visible:ring-4 focus-visible:ring-primary-focus-ring',
        className,
      )}
      {...props}
    />
  ),
);

CommandList.displayName = CMDKList.displayName;

// --- Component:CommandEmpty ---
type CommandEmptyRef = React.ElementRef<typeof CMDKEmpty>;
type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CMDKEmpty>;

export const CommandEmpty = forwardRef<CommandEmptyRef, CommandEmptyProps>(
  ({ className, ...props }, ref) => (
    <CMDKEmpty
      ref={ref}
      className={cn('py-6 text-center text-sm', className)}
      {...props}
    />
  ),
);

CommandEmpty.displayName = CMDKEmpty.displayName;

// --- Component:CommandGroup ---
type CommandGroupRef = React.ElementRef<typeof CMDKGroup>;
type CommandGroupProps = React.ComponentPropsWithoutRef<typeof CMDKGroup>;

export const CommandGroup = forwardRef<CommandGroupRef, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <CMDKGroup
      ref={ref}
      className={cn(
        'overflow-hidden p-1 text-grey-text-contrast',
        '[&_[cmdk-group-heading]]:flex [&_[cmdk-group-heading]]:select-none [&_[cmdk-group-heading]]:items-center [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-grey-text',
        className,
      )}
      {...props}
    />
  ),
);

CommandGroup.displayName = CMDKGroup.displayName;

// --- Component:CommandItem ---
type CommandItemRef = React.ElementRef<typeof CMDKItem>;
type CommandItemProps = React.ComponentPropsWithoutRef<typeof CMDKItem>;

export const CommandItem = forwardRef<CommandItemRef, CommandItemProps>(
  ({ className, ...props }, ref) => (
    <CMDKItem
      ref={ref}
      className={cn(
        'group relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none',
        'aria-selected:bg-primary-bg-hover',
        'aria-disabled:cursor-not-allowed aria-disabled:text-grey-solid',
        className,
      )}
      {...props}
    />
  ),
);

CommandItem.displayName = CMDKItem.displayName;

// --- Component:CommandShortcut ---
type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

export const CommandShortcut = ({
  className,
  ...props
}: CommandShortcutProps) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-grey-text',
        'group-aria-disabled:text-grey-solid',
        className,
      )}
      {...props}
    />
  );
};

// --- Component:CommandSeparator ---
type CommandSeparatorRef = React.ElementRef<typeof CMDKSeparator>;
type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CMDKSeparator
>;

export const CommandSeparator = forwardRef<
  CommandSeparatorRef,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CMDKSeparator
    ref={ref}
    className={cn('-mx-1 h-px bg-grey-line', className)}
    {...props}
  />
));

CommandSeparator.displayName = CMDKSeparator.displayName;
