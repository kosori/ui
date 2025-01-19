export const DotsPulseDemo = () => {
  return (
    <div className='space-x-1.5'>
      <span className='inline-block size-2 animate-flash rounded-full bg-grey-text-contrast' />
      <span className='inline-block size-2 animate-flash rounded-full bg-grey-text-contrast [animation-delay:0.2s]' />
      <span className='inline-block size-2 animate-flash rounded-full bg-grey-text-contrast [animation-delay:0.4s]' />
    </div>
  );
};
