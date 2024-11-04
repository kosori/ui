'use client';

import { Frame, Map, PieChart, Plus } from 'lucide-react';
import { toast, Toaster } from 'sonner';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@kosori/ui/sidebar';

const DemoSidebarGroupAction = () => {
  return (
    <SidebarProvider>
      <Toaster
        position='bottom-left'
        toastOptions={{
          className: 'ml-[160px]',
        }}
      />
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupAction
              title='Add Project'
              onClick={() => toast('You clicked the group action!')}
            >
              <Plus /> <span className='sr-only'>Add Project</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href='#'>
                      <Frame />
                      <span>Design Engineering</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href='#'>
                      <PieChart />
                      <span>Sales & Marketing</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href='#'>
                      <Map />
                      <span>Travel</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default DemoSidebarGroupAction;
