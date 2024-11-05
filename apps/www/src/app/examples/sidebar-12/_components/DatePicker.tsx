'use client';

import { useState } from 'react';

import { Calendar } from '@kosori/ui/calendar';
import { SidebarGroup, SidebarGroupContent } from '@kosori/ui/sidebar';

export const DatePicker = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <SidebarGroup className='px-0'>
      <SidebarGroupContent>
        <Calendar
          className='[&_table]:w-full [&_tr]:justify-between'
          mode='single'
          selected={selected}
          onSelect={setSelected}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
