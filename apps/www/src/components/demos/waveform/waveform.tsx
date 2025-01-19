export const WaveformDemo = () => {
  return (
    <div className='flex size-10 flex-row flex-nowrap items-center justify-between'>
      <div className='h-full w-1 animate-[grow_1s_ease-in-out_0.55s_infinite] rounded-full bg-grey-text-contrast'></div>
      <div className='h-full w-1 animate-[grow_1s_ease-in-out_0.7s_infinite] rounded-full bg-grey-text-contrast'></div>
      <div className='h-full w-1 animate-[grow_1s_ease-in-out_0.85s_infinite] rounded-full bg-grey-text-contrast'></div>
      <div className='h-full w-1 animate-[grow_1s_ease-in-out_infinite] rounded-full bg-grey-text-contrast'></div>
    </div>
  );
};
