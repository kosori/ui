import { IconHome, IconInbox, IconSettings } from '@tabler/icons-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const items = [
  { icon: IconHome, title: 'Home' },
  { icon: IconInbox, title: 'Inbox' },
  { icon: IconSettings, title: 'Settings' },
];

const SidebarExample = () => (
  <div className='relative h-80 w-full translate-y-0 overflow-hidden rounded-lg border'>
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <div className='flex h-8 items-center gap-2 px-2 font-medium text-sm'>
            Acme
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(({ icon: Icon, title }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton tooltip={title}>
                      <Icon />
                      <span>{title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className='flex items-center gap-2 border-b p-2'>
          <SidebarTrigger />
          <span className='font-medium text-sm'>Dashboard</span>
        </header>
        <div className='p-6 text-muted-foreground text-sm'>
          The sidebar is collapsed to its icon rail. Use the trigger to expand
          it.
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
);

export default SidebarExample;
