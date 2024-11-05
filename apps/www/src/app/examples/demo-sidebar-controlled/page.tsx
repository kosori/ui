'use client';

import { useState } from 'react';
import {
  Frame,
  LifeBuoy,
  Map,
  PanelLeftClose,
  PanelLeftOpen,
  PieChart,
  Send,
} from 'lucide-react';

import { Button } from '@kosori/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@kosori/ui/sidebar';

const projects = [
  {
    name: 'Design Engineering',
    url: '#',
    icon: Frame,
  },
  {
    name: 'Sales & Marketing',
    url: '#',
    icon: PieChart,
  },
  {
    name: 'Travel',
    url: '#',
    icon: Map,
  },
  {
    name: 'Support',
    url: '#',
    icon: LifeBuoy,
  },
  {
    name: 'Feedback',
    url: '#',
    icon: Send,
  },
];

const DemoSidebarControlled = () => {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className='flex h-12 items-center justify-between px-4'>
          <Button
            size='small'
            variant='ghost'
            onClick={() => setOpen((open) => !open)}
          >
            {open ? <PanelLeftClose /> : <PanelLeftOpen />}
            <span>{open ? 'Close' : 'Open'} Sidebar</span>
          </Button>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DemoSidebarControlled;
