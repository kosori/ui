export const DotsScaleDemo = () => {
  return (
    <div className='flex gap-x-2'>
      <div className='block size-2 animate-pulse2 rounded-full bg-grey-text-contrast'></div>
      <div className='block size-2 animate-pulse2 rounded-full bg-grey-text-contrast [animation-delay:0.1625s]'></div>
      <div className='block size-2 animate-pulse2 rounded-full bg-grey-text-contrast [animation-delay:0.39s]'></div>
    </div>
  );
};
