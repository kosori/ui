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
    <header>
      <div className='max-w-container mx-auto flex size-full flex-row items-center justify-between gap-6 px-6 pt-4'>
        <div className={clsx('inline-flex gap-8')}>
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
                    Products
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
                    Resources
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
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className='inline-flex gap-4'>
          <Button variant='outline'>Log in</Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  );
};
