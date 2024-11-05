'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@kosori/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@kosori/ui/sidebar';

type Props = {
  versions: string[];
  defaultVersion: string;
};

export const VersionSwitcher = ({ versions, defaultVersion }: Props) => {
  const [selectedVersion, setSelectedVersion] = useState(defaultVersion);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className='data-[state=open]:text-grey-text-active data-[state=open]:bg-grey-bg-active'
              size='large'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-grey-text-contrast text-grey-base'>
                <GalleryVerticalEnd className='size-4' />
              </div>
              <div className='flex flex-col gap-0.5 leading-none'>
                <span className='font-semibold'>Documentation</span>
                <span className=''>v{selectedVersion}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            className='w-[--radix-dropdown-menu-trigger-width]'
          >
            {versions.map((version) => (
              <DropdownMenuItem
                key={version}
                onSelect={() => setSelectedVersion(version)}
              >
                v{version}{' '}
                {version === selectedVersion && <Check className='ml-auto' />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
