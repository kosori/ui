'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { SiDribbble, SiLinkedin, SiX } from '@icons-pack/react-simple-icons';
import { clsx } from 'clsx/lite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@kosori/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kosori/ui/form';
import { Input } from '@kosori/ui/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@kosori/ui/navigation-menu';
import { Separator } from '@kosori/ui/separator';
import { Textarea } from '@kosori/ui/textarea';

import { Logo } from '~/components/Layout/Logo';

const FormSchema = z.object({
  firstName: z.string().min(1, { message: 'Please enter your first name' }),
  lastName: z.string().min(1, { message: 'Please enter your last name' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(1, { message: 'Please enter your phone number' }),
  message: z
    .string()
    .min(1, { message: 'Please tell us what we can help you with' }),
});

const Contact: NextPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <div className={clsx('p-2', 'sm:p-4', 'md:p-6')}>
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

      <main
        className={clsx(
          'mx-auto my-6 grid max-w-screen-lg grid-cols-1 gap-0 px-0',
          'sm:my-14 sm:px-4',
          'md:grid-cols-2 md:px-6',
          'lg:my-20 lg:gap-12',
        )}
      >
        <section
          className={clsx(
            'space-y-8 rounded-lg bg-gradient-to-b from-grey-text-contrast to-grey-text-contrast/80 p-4 text-grey-base',
            'sm:p-6',
            'md:p-8',
          )}
        >
          <div>
            <h1
              className={clsx(
                'text-2xl font-bold',
                'sm:text-3xl',
                'md:text-4xl',
              )}
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

        <section className={clsx('px-4 py-8', 'md:px-6', 'lg:px-8')}>
          <Form {...form}>
            <form
              className='grid w-full gap-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder='First name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder='Last name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Email' type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder='Phone number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className='max-h-[140px] min-h-[120px] resize-y'
                        placeholder='Tell us what we can help you with'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className='!mt-8 w-full'>Send message</Button>
            </form>
          </Form>
        </section>
      </main>

      <Separator className='my-12' />

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
              className={clsx(
                'text-grey-text',
                'hover:text-grey-text-contrast',
              )}
              href='#'
            >
              <SiX className='size-4' />
            </a>
            <a
              className={clsx(
                'text-grey-text',
                'hover:text-grey-text-contrast',
              )}
              href='#'
            >
              <SiLinkedin className='size-4' />
            </a>
            <a
              className={clsx(
                'text-grey-text',
                'hover:text-grey-text-contrast',
              )}
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
    </div>
  );
};

export default Contact;
