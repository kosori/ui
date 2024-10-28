import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@kosori/ui/breadcrumb';
import { Separator } from '@kosori/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@kosori/ui/sidebar';

import { AppSidebar } from './_components/AppSidebar';

export const iframeHeight = '800px';

export const description = 'Collapsible nested sidebars.';

const Sidebar9 = () => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '350px',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className='sticky top-0 flex shrink-0 items-center gap-2 border-b bg-grey-base p-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator className='mr-2 h-4' orientation='vertical' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='#'>All Inboxes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem>
                <BreadcrumbPage>Inbox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className='aspect-video h-12 w-full rounded-lg bg-grey-bg-subtle'
            />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Sidebar9;
