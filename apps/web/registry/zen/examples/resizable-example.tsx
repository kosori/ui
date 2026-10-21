import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const ResizableExample = () => (
  <div className='h-64 w-full max-w-md'>
    <ResizablePanelGroup>
      <ResizablePanel>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-medium text-sm'>One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-medium text-sm'>Two</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-medium text-sm'>Three</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
);

export default ResizableExample;
