import { Fragment } from 'react';
import { Check, ChevronRight } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@kosori/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@kosori/ui/sidebar';

type Props = {
  calendars: {
    name: string;
    items: string[];
  }[];
};

export const Calendars = ({ calendars }: Props) => {
  return (
    <>
      {calendars.map((calendar, index) => (
        <Fragment key={calendar.name}>
          <SidebarGroup key={calendar.name} className='py-0'>
            <Collapsible
              className='group/collapsible'
              defaultOpen={index === 0}
            >
              <SidebarGroupLabel
                asChild
                className='group/label w-full text-sm text-grey-text hover:bg-grey-bg-hover hover:text-grey-text-contrast'
              >
                <CollapsibleTrigger>
                  {calendar.name}{' '}
                  <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {calendar.items.map((item, index) => (
                      <SidebarMenuItem key={item}>
                        <SidebarMenuButton>
                          <div
                            className='group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center overflow-hidden rounded-md border border-grey-border text-primary-base data-[active=true]:border-0 data-[active=true]:bg-primary-solid'
                            data-active={index < 2}
                          >
                            <Check className='hidden size-3 group-data-[active=true]/calendar-item:block' />
                          </div>
                          {item}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
          <SidebarSeparator className='mx-0' />
        </Fragment>
      ))}
    </>
  );
};
