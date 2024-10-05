'use client';

import type { LucideIcon } from 'lucide-react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx/lite';
import {
  BoxIcon,
  CircleHelpIcon,
  DollarSignIcon,
  FlagIcon,
  FolderIcon,
  FootprintsIcon,
  MailIcon,
  WorkflowIcon,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@kosori/ui/accordion';
import { Button } from '@kosori/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@kosori/ui/card';
import { Input } from '@kosori/ui/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@kosori/ui/navigation-menu';

import { Logo } from '~/components/Layout/Logo';

const Faqs: NextPage = () => {
  return (
    <div className={clsx('p-2', 'sm:p-4', 'md:p-6')}>
      <div className='max-w-container dark mx-auto rounded-lg border bg-grey-bg-subtle'>
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

        <div className='max-w-container mx-auto mt-10 px-6 pb-6'>
          <h1
            className={clsx(
              'text-2xl font-bold text-grey-text-contrast',
              'sm:text-3xl',
              'md:text-4xl',
            )}
          >
            Support &amp; Documentation
          </h1>

          <div className='relative mt-4 max-w-xs'>
            <MagnifyingGlassIcon className='absolute left-2 top-1/2 -translate-y-1/2 text-grey-text-contrast' />
            <Input className='pl-7' id='search' placeholder='Search' />
          </div>
        </div>
      </div>

      <div className={clsx('max-w-container mx-auto px-2 pt-14', 'sm:px-6')}>
        <h2
          className={clsx(
            'text-xl font-semibold text-grey-text-contrast',
            'sm:text-2xl',
            'md:text-3xl',
          )}
        >
          Advice and answers
        </h2>
        <p>Everything you need to know about the product and how it works.</p>

        <div
          className={clsx(
            'mt-10 grid grid-cols-1 gap-6',
            'min-[500px]:grid-cols-2',
            'lg:grid-cols-4',
          )}
        >
          <Card>
            <CardHeader>
              <CardIcon icon={FlagIcon} />
              <CardTitle>Kõsori</CardTitle>
              <CardDescription>
                Kõsori is a collection of tools and services.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardIcon icon={WorkflowIcon} />
              <CardTitle>Workflow</CardTitle>
              <CardDescription>
                Kõsori is a collection of tools and services.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardIcon icon={CircleHelpIcon} />
              <CardTitle>Support</CardTitle>
              <CardDescription>
                Kõsori is a collection of tools and services.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardIcon icon={FolderIcon} />
              <CardTitle>Branding</CardTitle>
              <CardDescription>
                Kõsori is a collection of tools and services.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardIcon icon={FootprintsIcon} />
              <CardTitle>Install Guide</CardTitle>
              <CardDescription>
                Kõsori is a collection of tools and services.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardIcon icon={BoxIcon} />
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Kõsori is a collection of tools and services.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardIcon icon={DollarSignIcon} />
              <CardTitle>Pricing</CardTitle>
              <CardDescription>
                Kõsori is a collection of tools and services.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardIcon icon={MailIcon} />
              <CardTitle> Contact</CardTitle>
              <CardDescription>
                Kõsori is a collection of tools and services.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div
        className={clsx(
          'max-w-container mx-auto grid grid-cols-1 gap-6 px-2 pt-20',
          'sm:px-6',
          'md:grid-cols-2',
        )}
      >
        <div>
          <h2 className='text-3xl font-semibold text-grey-text-contrast'>
            General FAQs
          </h2>
          <p>
            Can't find an answer? Please{' '}
            <Link
              className={clsx('text-primary-solid', 'hover:underline')}
              href='#'
            >
              chat with us
            </Link>
          </p>
        </div>

        <div>
          <Accordion collapsible className='grid gap-4' type='single'>
            <AccordionItem value='free-trial'>
              <AccordionTrigger>Is there a free trial?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, there is a free trial available. You can try it out for
                  30 days for free. After that, you will need to pay for the
                  full version.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='platforms'>
              <AccordionTrigger>What platforms does support?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Kõsori is available on Windows, macOS and Linux, as well as
                  mobile applications for iOS and Android.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='cancel-subscription'>
              <AccordionTrigger>
                How do I cancel my subscription?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You can cancel your subscription at any time by going to your
                  account settings and selecting "Cancel subscription".
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='payment-methods'>
              <AccordionTrigger>
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  We accept all major credit cards, PayPal, and bank transfers.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='data-safe'>
              <AccordionTrigger>Is my data safe?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yew, we take your privacy seriously. We use encryption and
                  follow best practices to ensure your data is protected.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='upgrade-downgrade'>
              <AccordionTrigger>
                Can I upgrade or downgrade my plan?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, you can upgrade or downgrade your plan at any time
                  through your account settings.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='refund'>
              <AccordionTrigger>Can I get a refund?</AccordionTrigger>
              <AccordionContent>
                <p>Yes, you can request a refund from your account settings.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='cancel-account'>
              <AccordionTrigger>Can I cancel my account?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, you can cancel your account at any time by going to your
                  account settings and selecting "Cancel account".
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='delete-data'>
              <AccordionTrigger>
                What happens to may data if I cancel?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  If you cancel your subscription, you will retain access to
                  your data for 30 days. After that, your data will be deleted
                  from our servers.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

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
    </div>
  );
};

const CardIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return (
    <div className='mb-2 w-fit rounded-md border p-2'>
      <Icon className='size-4' />
    </div>
  );
};

export default Faqs;
