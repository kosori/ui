'use client';

import { clsx } from 'clsx/lite';
import { ChevronDown, LifeBuoy, Send } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@kosori/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@kosori/ui/sidebar';

const DemoSidebarGroupCollapsible = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <Collapsible defaultOpen className='group/collapsible'>
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className={clsx(
                  'text-sm',
                  'hover:bg-grey-bg-hover hover:text-grey-text-contrast',
                )}
              >
                <CollapsibleTrigger>
                  Help
                  <ChevronDown
                    className={clsx(
                      'ml-auto transition-transform',
                      'group-data-[state=open]/collapsible:rotate-180',
                    )}
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <LifeBuoy />
                        Support
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Send />
                        Feedback
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default DemoSidebarGroupCollapsible;
