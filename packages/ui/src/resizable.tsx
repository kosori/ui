import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { tv } from 'tailwind-variants';

const resizableStyles = tv({
  slots: {
    base: clsx(
      'flex h-full w-full',
      'data-[panel-group-direction=vertical]:flex-col',
    ),
    handle: clsx(
      'group relative flex w-px items-center justify-center bg-grey-border outline-none transition-colors duration-75',
      'after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2',
      'focus-visible:ring-4 focus-visible:ring-grey-focus-ring',
      'data-[resize-handle-state=hover]:bg-grey-border-hover',
      'data-[resize-handle-state=drag]:bg-grey-border-hover',
      'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full',
      'data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0',
      '[&[data-panel-group-direction=vertical]>div]:rotate-90',
    ),
    handleIconWrapper: clsx(
      'z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-grey-border bg-grey-bg',
      'group-data-[resize-handle-state=hover]:border-grey-border-hover group-data-[resize-handle-state=hover]:bg-grey-bg-hover',
      'group-data-[resize-handle-state=drag]:border-grey-border-hover group-data-[resize-handle-state=drag]:bg-grey-bg-active',
    ),
    handleIcon: 'size-2.5',
  },
});

const { base, handle, handleIconWrapper, handleIcon } = resizableStyles();

type ResizablePanelGroupProps = React.ComponentProps<typeof PanelGroup>;

/**
 * ResizablePanelGroup component that serves as a container for resizable panels.
 *
 * @param {ResizablePanelGroupProps} props - The props for the ResizablePanelGroup component.
 *
 * @example
 * <ResizablePanelGroup direction='horizontal'>
 *   <ResizablePanel>One</ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel>Two</ResizablePanel>
 * </ResizablePanelGroup>
 *
 * @see {@link https://dub.sh/ui-resizable-panel-group ResizablePanelGroup Docs} for further information.
 */
export const ResizablePanelGroup = ({
  className,
  ...props
}: ResizablePanelGroupProps) => (
  <PanelGroup className={base({ className })} {...props} />
);

/**
 * ResizablePanel component that represents an individual panel within the ResizablePanelGroup.
 *
 * @param {React.ComponentProps<typeof Panel>} props - The props for the ResizablePanel component.
 *
 * @example
 * <ResizablePanel>Content</ResizablePanel>
 */
export const ResizablePanel = Panel;

type ResizableHandleProps = React.ComponentProps<typeof PanelResizeHandle> & {
  withHandle?: boolean;
};

/**
 * ResizableHandle component that allows for resizing of panels within the ResizablePanelGroup.
 *
 * @param {ResizableHandleProps} props - The props for the ResizableHandle component.
 * @param {boolean} [withHandle] - Indicates if the handle should be displayed.
 *
 * @example
 * <ResizableHandle withHandle />
 */
export const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ResizableHandleProps) => (
  <PanelResizeHandle className={handle({ className })} {...props}>
    {withHandle && (
      <div className={handleIconWrapper()}>
        <DragHandleDots2Icon className={handleIcon()} />
      </div>
    )}
  </PanelResizeHandle>
);
