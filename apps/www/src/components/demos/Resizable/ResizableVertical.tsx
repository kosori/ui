'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@kosori/ui/resizable';

export const ResizableVerticalDemo = () => {
  return (
    <ResizablePanelGroup
      className='min-h-[200px] max-w-md rounded-lg border'
      direction='vertical'
    >
      <ResizablePanel defaultSize={25}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
