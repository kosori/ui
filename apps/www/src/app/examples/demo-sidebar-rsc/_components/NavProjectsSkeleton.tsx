import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '@kosori/ui/sidebar';

export const NavProjectsSkeleton = () => {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
