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

      <span className='flex items-center gap-2 font-medium [.uwu_&]:hidden max-md:[header_&]:hidden'>
        kōsori/ui{' '}
        <span className='rounded-full bg-grey-text-contrast px-1.5 py-1 text-[10px] leading-none text-grey-base'>
          alpha
        </span>
      </span>
    </>
  );
};
