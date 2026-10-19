import { Separator } from '@/components/ui/separator';

const SeparatorExample = () => (
  <div className='flex w-full max-w-sm flex-col gap-2'>
    <span className='text-sm'>kosori</span>
    <Separator />
    <span className='text-muted-foreground text-sm'>Registry</span>
  </div>
);

export default SeparatorExample;
