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

      <span className='font-medium [.uwu_&]:hidden max-md:[header_&]:hidden'>
        kōsori/ui
      </span>
    </>
  );
};
