import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@kosori/ui/breadcrumb';
import { Separator } from '@kosori/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@kosori/ui/sidebar';

import { AppSidebar } from './_components/AppSidebar';
import { NavActions } from './_components/NavActions';

export const iframeHeight = '800px';

export const description = 'A sidebar in a popover.';

const Sidebar10 = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-14 shrink-0 items-center gap-2'>
          <div className='flex flex-1 items-center gap-2 px-3'>
            <SidebarTrigger />
            <Separator className='mr-2 h-4' orientation='vertical' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className='line-clamp-1'>
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className='ml-auto px-3'>
            <NavActions />
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 px-4 py-10'>
          <div className='mx-auto h-24 w-full max-w-3xl rounded-xl bg-grey-bg-subtle' />
          <div className='mx-auto h-full w-full max-w-3xl rounded-xl bg-grey-bg-subtle' />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Sidebar10;
