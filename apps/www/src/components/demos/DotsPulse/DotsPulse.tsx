export const DotsPulseDemo = () => {
  return (
    <div className='space-x-1.5'>
      <span className='animate-flash inline-block size-2 rounded-full bg-grey-text-contrast' />
      <span className='animate-flash inline-block size-2 rounded-full bg-grey-text-contrast [animation-delay:0.2s]' />
      <span className='animate-flash inline-block size-2 rounded-full bg-grey-text-contrast [animation-delay:0.4s]' />
    </div>
  );
};
