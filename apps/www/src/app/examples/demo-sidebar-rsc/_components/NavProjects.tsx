import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@kosori/ui/sidebar';

import { projects } from '../_config/projects';

// Dummy fetch function
const fetchProjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return projects;
};

export const NavProjects = async () => {
  const projects = await fetchProjects();

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.name}>
          <SidebarMenuButton asChild>
            <a href={project.url}>
              <project.icon />
              <span>{project.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
