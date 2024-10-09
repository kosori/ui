import { SiDribbble, SiLinkedin, SiX } from '@icons-pack/react-simple-icons';
import { clsx } from 'clsx/lite';

export const Hero = () => {
  return (
    <section
      className={clsx(
        'space-y-8 rounded-lg bg-gradient-to-b from-grey-text-contrast to-grey-text-contrast/80 p-4 text-grey-base',
        'sm:p-6',
        'md:p-8',
      )}
    >
      <div>
        <h1
          className={clsx('text-2xl font-bold', 'sm:text-3xl', 'md:text-4xl')}
        >
          Get in touch
        </h1>
        <p className='sm:text-lg'>
          Email, call or complete the form to learn how we can help you.
        </p>
      </div>

      <div>
        <h4 className='text-lg font-medium'>Chat to us</h4>
        <p className='text-sm'>Our team is available to chat with you.</p>
        <a className='text-sm underline' href='mailto:hello@kosori.com'>
          hello@kosori.com
        </a>
      </div>

      <div>
        <h4 className='text-lg font-medium'>Call us</h4>
        <p className='text-sm'>Monday to Friday, 9am to 5pm</p>
        <a className='text-sm underline' href='tel:+001234567890'>
          +(00) 123 456 7890
        </a>
      </div>

      <div className='space-y-2'>
        <h4 className='text-lg font-medium'>Social media</h4>
        <div className='flex gap-4'>
          <a href='#'>
            <SiX className='size-4' />
          </a>
          <a href='#'>
            <SiLinkedin className='size-4' />
          </a>
          <a href='#'>
            <SiDribbble className='size-4' />
          </a>
        </div>
      </div>
    </section>
  );
};
