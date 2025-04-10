import Link from 'next/link';
import { clsx } from 'clsx/lite';

import { Button } from '@kosori/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@kosori/ui/navigation-menu';

import { Logo } from '~/app/_components/logo';

export const Header = () => {
  return (
    <header
      className={clsx(
        'max-w-container mx-auto flex size-full flex-row items-center justify-between gap-8 px-4',
        'sm:px-4 sm:pt-4',
        'md:px-6',
      )}
    >
      <Link
        className={clsx(
          'inline-flex items-center gap-2 font-semibold text-grey-base',
          '[&_img]:size-9',
          '[&>span]:hidden [&>span]:text-grey-text-contrast',
          '[&>span]:min-[700px]:inline-block',
          '[&>span>span]:hidden',
        )}
        href='/examples/faqs'
      >
        <Logo />
      </Link>

      <NavigationMenu className='hidden sm:inline-flex'>
        <NavigationMenuList className='gap-4'>
          <NavigationMenuItem>
            <Link legacyBehavior passHref href='#'>
              <NavigationMenuLink
                className={clsx(
                  'cursor-pointer text-sm',
                  'hover:text-grey-text-contrast hover:underline',
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link legacyBehavior passHref href='#'>
              <NavigationMenuLink
                className={clsx(
                  'cursor-pointer text-sm',
                  'hover:text-grey-text-contrast hover:underline',
                )}
              >
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link legacyBehavior passHref href='#'>
              <NavigationMenuLink
                className={clsx(
                  'cursor-pointer text-sm',
                  'hover:text-grey-text-contrast hover:underline',
                )}
              >
                About us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link legacyBehavior passHref href='#'>
              <NavigationMenuLink
                className={clsx(
                  'cursor-pointer text-sm',
                  'hover:text-grey-text-contrast hover:underline',
                )}
              >
                Support
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className='inline-flex gap-4'>
        <Button variant='outline'>Log in</Button>
        <Button>Register</Button>
      </div>
    </header>
  );
};
