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

export const iframeHeight = '800px';

export const description = 'A sidebar with a calendar.';

const Sidebar12 = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator className='mr-2 h-4' orientation='vertical' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>October 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-5'>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className='bg-muted/50 aspect-square rounded-xl' />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Sidebar12;
