import Link from 'next/link';
import { clsx } from 'clsx/lite';

export const Footer = () => {
  return (
    <footer
      className={clsx(
        'max-w-container dark mx-auto mt-14 grid grid-cols-3 gap-6 rounded-lg border bg-grey-bg-subtle p-6',
        'md:grid-cols-5',
        'lg:grid-cols-7',
      )}
    >
      <div className={clsx('col-span-3 space-y-2', 'md:col-span-2')}>
        <h3 className='text-lg font-semibold text-grey-text-contrast'>
          Kõsori
        </h3>
        <p>Designed and developed by Kõsori</p>
        <span className='inline-block'>
          &copy; 2023 Kõsori. All rights reserved.
        </span>
      </div>

      <div>
        <h6 className='text-sm font-medium'>Product</h6>

        <ul className='space-y-1 text-grey-text-contrast'>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Overview
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Features
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Solutions
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Tutorials
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Pricing
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Releases
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h6 className='text-sm font-medium'>Company</h6>

        <ul className='space-y-1 text-grey-text-contrast'>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              About us
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Careers
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Press
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              News
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Media kit
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h6 className='text-sm font-medium'>Resources</h6>

        <ul className='space-y-1 text-grey-text-contrast'>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Blog
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Newsletter
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Events
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Help center
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Tutorials
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Support
            </Link>
          </li>
        </ul>
      </div>

      <div className='md:max-lg:col-start-3'>
        <h6 className='text-sm font-medium'>Social</h6>

        <ul className='space-y-1 text-grey-text-contrast'>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Twitter
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              LinkedIn
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Facebook
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              GitHub
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Polywork
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Dribbble
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h6 className='text-sm font-medium'>Legal</h6>

        <ul className='space-y-1 text-grey-text-contrast'>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Terms
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Privacy
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Cookies
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Licenses
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Settings
            </Link>
          </li>
          <li>
            <Link className='text-sm hover:underline' href='#'>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
