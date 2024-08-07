'use client';

import { useState } from 'react';

import { Button } from '@kosori/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@kosori/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: 'backlog',
    label: 'Backlog',
  },
  {
    value: 'todo',
    label: 'Todo',
  },
  {
    value: 'in progress',
    label: 'In Progress',
  },
  {
    value: 'done',
    label: 'Done',
  },
  {
    value: 'canceled',
    label: 'Canceled',
  },
];

export const ComboboxPopoverDemo = () => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  return (
    <div className='flex items-center gap-4'>
      <p className='text-sm text-grey-text'>Status</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className='w-[150px] justify-start' variant='outline'>
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='p-0' side='right'>
          <Command>
            <CommandInput placeholder='Change status...' />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ??
                        null,
                      );
                      setOpen(false);
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
