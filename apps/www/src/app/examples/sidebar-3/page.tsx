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

export const description = 'A sidebar with submenus.';

const Sidebar3 = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
          <div className='flex items-center gap-2 px-3'>
            <SidebarTrigger />
            <Separator className='mr-2 h-4' orientation='vertical' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <div className='aspect-video rounded-xl bg-grey-bg-subtle' />
            <div className='aspect-video rounded-xl bg-grey-bg-subtle' />
            <div className='aspect-video rounded-xl bg-grey-bg-subtle' />
          </div>
          <div className='min-h-screen flex-1 rounded-xl bg-grey-bg-subtle md:min-h-min' />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Sidebar3;
