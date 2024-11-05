'use client';

import { ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@kosori/ui/dropdown-menu';
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@kosori/ui/sidebar';

const DemoSidebarHeader = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className='data-[state=open]:bg-grey-bg-active data-[state=open]:text-grey-text-contrast'>
                    Select Workspace
                    <ChevronDown className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Acme Corp.</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <header className='flex h-12 items-center justify-between px-4'>
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DemoSidebarHeader;
