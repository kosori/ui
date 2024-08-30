import Image from 'next/image';

import LogoImage from '../../../public/kosori.png';

export const Logo = () => {
  return (
    <>
      <Image
        alt='Kosori'
        aria-label='Fumadocs'
        className='w-6 rounded-full object-cover'
        sizes='100px'
        src={LogoImage}
      />

      <span className='flex items-center gap-2 font-medium'>
        kōsori{' '}
        <span className='rounded-full bg-primary-solid px-1.5 py-1 text-[10px] leading-none text-primary-base'>
          alpha
        </span>
      </span>
    </>
  );
};
