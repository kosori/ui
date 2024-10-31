import { Plus } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@kosori/ui/sidebar';

import { Calendars } from './Calendars';
import { DatePicker } from './DatePicker';
import { NavUser } from './NavUser';

// This is sample data.
const data = {
  user: {
    name: 'codingcodax',
    email: 'm@example.com',
    avatar: '/avatars/codingcodax.jpeg',
  },
  calendars: [
    {
      name: 'My Calendars',
      items: ['Personal', 'Work', 'Family'],
    },
    {
      name: 'Favorites',
      items: ['Holidays', 'Birthdays'],
    },
    {
      name: 'Other',
      items: ['Travel', 'Reminders', 'Deadlines'],
    },
  ],
};

type Props = React.ComponentProps<typeof Sidebar>;

export const SidebarRight = ({ ...props }: Props) => {
  return (
    <Sidebar
      className='sticky top-0 hidden h-svh border-l lg:flex'
      collapsible='none'
      {...props}
    >
      <SidebarHeader className='h-16 border-b'>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className='mx-0' />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
