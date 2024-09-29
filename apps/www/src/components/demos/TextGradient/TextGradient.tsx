export const TextGradientDemo = () => {
  return (
    <div className='grid grid-cols-2 gap-4 text-center'>
      <p className='bg-gradient-to-b from-grey-text-contrast to-grey-solid bg-clip-text text-xl font-semibold text-transparent'>
        To bottom
      </p>

      <p className='bg-gradient-to-r from-grey-text-contrast to-grey-solid bg-clip-text text-xl font-semibold text-transparent'>
        To right
      </p>

      <p className='bg-gradient-to-t from-grey-text-contrast to-grey-solid bg-clip-text text-xl font-semibold text-transparent'>
        To top
      </p>

      <p className='bg-gradient-to-l from-grey-text-contrast to-grey-solid bg-clip-text text-xl font-semibold text-transparent'>
        To left
      </p>
    </div>
  );
};
