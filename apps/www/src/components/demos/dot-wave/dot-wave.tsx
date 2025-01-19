export const DotWaveDemo = () => {
  return (
    <div className='flex gap-x-2'>
      <div className='size-2 animate-jump rounded-full bg-grey-text-contrast will-change-transform [animation-delay:0.55s]' />
      <div className='size-2 animate-jump rounded-full bg-grey-text-contrast will-change-transform [animation-delay:0.7s]' />
      <div className='size-2 animate-jump rounded-full bg-grey-text-contrast will-change-transform [animation-delay:0.855s]' />
      <div className='size-2 animate-jump rounded-full bg-grey-text-contrast will-change-transform' />
    </div>
  );
};
