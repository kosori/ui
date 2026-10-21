import {
  IconBook,
  IconBrandGithub,
  IconCode,
  IconComponents,
  IconRocket,
} from '@tabler/icons-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const NavigationMenuExample = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className='grid w-80 gap-1'>
            <li>
              <NavigationMenuLink href='#'>
                <IconRocket aria-hidden='true' />
                <span className='font-medium'>Introduction</span>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href='#'>
                <IconBook aria-hidden='true' />
                <span className='font-medium'>Installation</span>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href='#'>
                <IconCode aria-hidden='true' />
                <span className='font-medium'>Typography</span>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className='grid w-80 gap-1'>
            <li>
              <NavigationMenuLink href='#'>
                <IconComponents aria-hidden='true' />
                <span className='font-medium'>Alert Dialog</span>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href='#'>
                <IconComponents aria-hidden='true' />
                <span className='font-medium'>Hover Card</span>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href='#'>
                <IconComponents aria-hidden='true' />
                <span className='font-medium'>Progress</span>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href='#'>
          <IconBrandGithub aria-hidden='true' />
          <span className='font-medium'>GitHub</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default NavigationMenuExample;
