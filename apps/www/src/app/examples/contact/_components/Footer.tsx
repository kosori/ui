import Link from 'next/link';
import { SiDribbble, SiLinkedin, SiX } from '@icons-pack/react-simple-icons';
import { clsx } from 'clsx/lite';

export const Footer = () => {
  return (
    <footer
      className={clsx(
        'max-w-container mx-auto grid grid-cols-2 gap-6 p-4',
        'sm:grid-cols-3',
        'md:grid-cols-5',
      )}
    >
      <div className={clsx('col-span-2 space-y-2', 'sm:col-span-1')}>
        <h3 className='text-xl font-semibold text-grey-text-contrast'>
          Kõsori
        </h3>

        <div className='flex gap-4'>
          <a
            className={clsx('text-grey-text', 'hover:text-grey-text-contrast')}
            href='#'
          >
            <SiX className='size-4' />
          </a>
          <a
            className={clsx('text-grey-text', 'hover:text-grey-text-contrast')}
            href='#'
          >
            <SiLinkedin className='size-4' />
          </a>
          <a
            className={clsx('text-grey-text', 'hover:text-grey-text-contrast')}
            href='#'
          >
            <SiDribbble className='size-4' />
          </a>
        </div>
      </div>

      <div>
        <h6 className='text-sm font-medium'>Use cases</h6>

        <ul className='space-y-1 text-grey-text-contrast'>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              UI Design
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              UX Design
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Prototyping
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Graphic design
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Wireframing
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Brainstorming
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Templates
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h6 className='text-sm font-medium'>Explore</h6>

        <ul className='space-y-1 text-grey-text-contrast'>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Design features
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Prototyping resources
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Collaboration resources
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Design system features
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Figma organization
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Pricing
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Figma for students
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Customers
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className='sm:max-md:col-start-2'>
        <h6 className='text-sm font-medium'>Resources</h6>

        <ul className='space-y-1 text-grey-text-contrast'>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Blog
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Best practices
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Support
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Developers
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Plugins
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Downloads
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Releases
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Careers
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Legal
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Status
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h6 className='text-sm font-medium'>Compare</h6>

        <ul className='space-y-1 text-grey-text-contrast'>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Sketch
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Adobe XD
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Invasion studio
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Framer
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Design on windows
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
