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

import { SidebarLeft } from './_components/SidebarLeft';
import { SidebarRight } from './_components/SidebarRight';

export const iframeHeight = '800px';

export const description = 'A left and right sidebar.';

const Sidebar15 = () => {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className='sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-grey-base'>
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
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <div className='mx-auto h-24 w-full max-w-3xl rounded-xl bg-grey-bg-subtle' />
          <div className='mx-auto h-screen w-full max-w-3xl rounded-xl bg-grey-bg-subtle' />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
};

export default Sidebar15;
