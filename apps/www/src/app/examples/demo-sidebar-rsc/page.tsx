import { Suspense } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from '@kosori/ui/sidebar';

import { NavProjects } from './_components/NavProjects';
import { NavProjectsSkeleton } from './_components/NavProjectsSkeleton';

const DemoSidebarRsc = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <Suspense fallback={<NavProjectsSkeleton />}>
                <NavProjects />
              </Suspense>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default DemoSidebarRsc;
