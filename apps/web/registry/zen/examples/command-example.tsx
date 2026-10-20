'use client';

import {
  IconArrowDown,
  IconArrowUp,
  IconCornerDownLeft,
} from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Kbd, KbdGroup } from '@/components/ui/kbd';

type Item = {
  label: string;
  shortcut?: string;
  value: string;
};

type Group = {
  items: Item[];
  value: string;
};

const suggestions: Item[] = [
  { label: 'Linear', shortcut: '⌘L', value: 'linear' },
  { label: 'Figma', shortcut: '⌘F', value: 'figma' },
  { label: 'Slack', shortcut: '⌘S', value: 'slack' },
  { label: 'YouTube', shortcut: '⌘Y', value: 'youtube' },
  { label: 'Raycast', shortcut: '⌘R', value: 'raycast' },
];

const commands: Item[] = [
  { label: 'Clipboard History', shortcut: '⌘⇧C', value: 'clipboard-history' },
  { label: 'Import Extension', shortcut: '⌘I', value: 'import-extension' },
  { label: 'Create Snippet', shortcut: '⌘N', value: 'create-snippet' },
  { label: 'System Preferences', shortcut: '⌘,', value: 'system-preferences' },
  {
    label: 'Window Management',
    shortcut: '⌘⇧W',
    value: 'window-management',
  },
];

const groupedItems: Group[] = [
  { items: suggestions, value: 'Suggestions' },
  { items: commands, value: 'Commands' },
];

const CommandExample = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'j' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant='outline' />}>
        Open Command Palette
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>J</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={groupedItems}>
          <CommandInput placeholder='Search for apps and commands...' />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: Group) => (
                <Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: Item) => (
                        <CommandItem
                          key={item.value}
                          // biome-ignore lint/performance/noJsxPropsBind: the handler closes over the dialog state
                          onClick={() => setOpen(false)}
                          value={item.value}
                        >
                          <span className='flex-1'>{item.label}</span>
                          {/* biome-ignore lint/suspicious/noLeakedRender: shortcut is a checked string */}
                          {item.shortcut && (
                            <CommandShortcut>{item.shortcut}</CommandShortcut>
                          )}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </Fragment>
              )}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <KbdGroup>
                  <Kbd>
                    <IconArrowUp />
                  </Kbd>
                  <Kbd>
                    <IconArrowDown />
                  </Kbd>
                </KbdGroup>
                <span>Navigate</span>
              </div>
              <div className='flex items-center gap-2'>
                <Kbd>
                  <IconCornerDownLeft />
                </Kbd>
                <span>Open</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Kbd>Esc</Kbd>
              <span>Close</span>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
};

export default CommandExample;
