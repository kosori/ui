'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@kosori/ui/resizable';

export const ResizableDemo = () => {
  return (
    <ResizablePanelGroup
      className='max-w-md rounded-lg border border-grey-line'
      direction='horizontal'
    >
      <ResizablePanel defaultSize={50}>
        <div className='flex h-[200px] items-center justify-center p-6'>
          <span className='font-semibold'>One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction='vertical'>
          <ResizablePanel defaultSize={25}>
            <div className='flex h-full items-center justify-center p-6'>
              <span className='font-semibold'>Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className='flex h-full items-center justify-center p-6'>
              <span className='font-semibold'>Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
