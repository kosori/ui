'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx/lite';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@kosori/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

export const NavigationMenuDemo = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className={clsx(
                'grid gap-3 p-4',
                'md:w-[400px]',
                'lg:w-[500px] lg:grid-cols-[.75fr_1fr]',
              )}
            >
              <li className='row-span-3'>
                <Link legacyBehavior passHref href='/'>
                  <NavigationMenuLink
                    className={clsx(
                      'flex size-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-grey-line/50 to-grey-bg-subtle p-6 no-underline outline-none',
                      'focus:shadow-md',
                    )}
                  >
                    <div className='size-6 rounded-md bg-grey-text-contrast' />
                    <div className='mb-2 mt-4 text-lg font-medium'>
                      kosori/ui
                    </div>
                    <p className='text-sm leading-tight text-grey-text'>
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <ListItem href='/docs' title='Introduction'>
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href='/docs/installation' title='Installation'>
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href='/docs/primitives/typography' title='Typography'>
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className={clsx(
                'grid w-[400px] gap-3 p-4',
                'md:w-[500px] md:grid-cols-2',
                'lg:w-[600px]',
              )}
            >
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  href={component.href}
                  title={component.title}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link legacyBehavior passHref href='/docs'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link ref={ref} legacyBehavior passHref {...props}>
        <NavigationMenuLink
          className={clsx(
            'block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors',
            'hover:bg-primary-bg-hover',
            'focus:bg-primary-bg-hover',
            'active:bg-primary-bg-active',
            className,
          )}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-grey-text'>
            {children}
          </p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});

ListItem.displayName = 'ListItem';
