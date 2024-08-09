import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { cn } from '@kosori/ui';

// --- Component:ResizablePanelGroup ---
type ResizablePanelGroupProps = React.ComponentProps<typeof PanelGroup>;

export const ResizablePanelGroup = ({
  className,
  ...props
}: ResizablePanelGroupProps) => (
  <PanelGroup
    className={cn(
      'flex h-full w-full',
      'data-[panel-group-direction=vertical]:flex-col',
      className,
    )}
    {...props}
  />
);

// --- Component:ResizablePanel ---
export const ResizablePanel = Panel;

// --- Component:ResizableHandle ---
type ResizableHandleProps = React.ComponentProps<typeof PanelResizeHandle> & {
  withHandle?: boolean;
};

export const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ResizableHandleProps) => (
  <PanelResizeHandle
    className={cn(
      'group relative flex w-px items-center justify-center bg-grey-border outline-none transition-colors duration-75',
      'after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2',
      'focus-visible:ring-4 focus-visible:ring-grey-focus-ring',
      'data-[resize-handle-state=hover]:bg-grey-border-hover',
      'data-[resize-handle-state=drag]:bg-grey-border-hover',
      'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full',
      'data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0',
      '[&[data-panel-group-direction=vertical]>div]:rotate-90',
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div
        className={cn(
          'z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-grey-border bg-grey-bg',
          'group-data-[resize-handle-state=hover]:border-grey-border-hover group-data-[resize-handle-state=hover]:bg-grey-bg-hover',
          'group-data-[resize-handle-state=drag]:border-grey-border-hover group-data-[resize-handle-state=drag]:bg-grey-bg-active',
        )}
      >
        <DragHandleDots2Icon className='h-2.5 w-2.5' />
      </div>
    )}
  </PanelResizeHandle>
);
