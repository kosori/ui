'use client';

import type { VariantProps } from 'tailwind-variants';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx/lite';
import { PanelLeft } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { useMediaQuery } from '@kosori/hooks/use-media-query';
import { Button } from '@kosori/ui/button';
import { Input } from '@kosori/ui/input';
import { Separator } from '@kosori/ui/separator';
import { Sheet, SheetContent } from '@kosori/ui/sheet';
import { Skeleton } from '@kosori/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kosori/ui/tooltip';

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

const sidebarStyles = tv({
  slots: {
    provider: clsx(
      'group/sidebar-wrapper text-grey-text flex min-h-svh w-full',
      'has-[[data-variant=inset]]:bg-grey-base',
    ),
    root: 'bg-grey-base text-grey-text',
    rootNoCollapsible:
      'bg-grey-bg-subtle text-grey-text flex h-full w-[--sidebar-width] flex-col',
    rootIsMobile: clsx(
      'bg-grey-base text-grey-text w-[--sidebar-width] p-0',
      '[&>button]:hidden',
    ),
    rootGap: clsx(
      'relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
      'group-data-[collapsible=offcanvas]:w-0',
      'group-data-[side=right]:rotate-180',
    ),
    rootWrapper: clsx(
      'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear',
      'md:flex',
    ),
    rootChild: clsx(
      'bg-grey-bg-subtle flex h-full w-full flex-col',
      'group-data-[variant=floating]:border-grey-line group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow',
    ),
    trigger: 'size-7',
    rail: clsx(
      'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear',
      'sm:flex',
      'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
      'hover:after:bg-grey-line',
      'group-data-[side=left]:-right-4',
      'group-data-[side=right]:left-0',
      'group-data-[collapsible=offcanvas]:translate-x-0',
      'group-data-[collapsible=offcanvas]:after:left-full',
      'group-data-[collapsible=offcanvas]:hover:bg-grey-base',
      '[[data-side=left]_&]:cursor-w-resize',
      '[[data-side=right]_&]:cursor-e-resize',
      '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
      '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
      '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
    ),
    inset: clsx(
      'bg-grey-base relative flex min-h-svh flex-1 flex-col',
      'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))]',
      'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
      'md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2',
    ),
    input: clsx(
      'bg-grey-base h-8 w-full shadow-none ring-grey-focus-ring',
      'focus-visible:ring-4',
    ),
    header: 'flex flex-col gap-2 p-2',
    footer: 'flex flex-col gap-2 p-2',
    separator: 'bg-grey-line mx-2 w-auto',
    content: clsx(
      'flex min-h-0 flex-1 flex-col gap-2 overflow-auto',
      'group-data-[collapsible=icon]:overflow-hidden',
    ),
    group: 'relative flex w-full min-w-0 flex-col p-2',
    groupLabel: clsx(
      'text-grey-text ring-grey-focus-ring flex h-8 select-none shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opa] duration-200 ease-linear focus-visible:ring-4 [&>svg]:size-4 [&>svg]:shrink-0',
      'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
    ),
    groupAction: clsx(
      'text-grey-text ring-grey-focus-ring absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform',
      'hover:bg-grey-base-accent hover:text-grey-text-contrast',
      'focus-visible:ring-4',
      '[&>svg]:size-4 [&>svg]:shrink-0',
      // Increases the hit area of the button on mobile.
      'after:absolute after:-inset-2 after:md:hidden',
      'group-data-[collapsible=icon]:hidden',
    ),
    groupContent: 'w-full text-sm',
    menu: 'flex w-full min-w-0 flex-col gap-1',
    item: 'group/menu-item relative',
    menuAction: clsx(
      'text-grey-text ring-grey-focus-ring absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform',
      'hover:bg-grey-bg-hover hover:text-grey-text-contrast',
      'active:bg-grey-bg-active active:text-grey-text-contrast',
      'peer-hover/menu-button:text-grey-text-contrast',
      'focus-visible:ring-4',
      '[&>svg]:size-4 [&>svg]:shrink-0',
      // Increases the hit area of the button on mobile.
      'after:absolute after:-inset-2 after:md:hidden',
      'peer-data-[size=small]/menu-button:top-1',
      'peer-data-[size=medium]/menu-button:top-1.5',
      'peer-data-[size=large]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
    ),
    menuBadge: clsx(
      'text-grey-text pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums',
      'peer-hover/menu-button:text-grey-text-contrast peer-data-[active=true]/menu-button:text-grey-text-contrast',
      'peer-data-[size=small]/menu-button:top-1',
      'peer-data-[size=medium]/menu-button:top-1.5',
      'peer-data-[size=large]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
    ),
    skeleton: 'flex h-8 items-center gap-2 rounded-md px-2',
    menuSub: clsx(
      'border-grey-line mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
      'group-data-[collapsible=icon]:hidden',
    ),
    menuSubButton: clsx(
      'text-grey-text ring-grey-focus-ring flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none',
      'hover:bg-grey-bg-hover hover:text-grey-text-contrast',
      'active:bg-grey-bg-active active:text-grey-text-contrast',
      'focus-visible:ring-4',
      'disabled:pointer-events-none disabled:opacity-50',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      'data-[active=true]:bg-grey-base-accent data-[active=true]:text-grey-text-contrast',
      'group-data-[collapsible=icon]:hidden',
      '[&>svg]:text-grey-text-contrast [&>svg]:size-4 [&>svg]:shrink-0',
      '[&>span:last-child]:truncate',
    ),
  },
  variants: {
    variant: {
      floating: {
        rootGap:
          'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]',
        rootWrapper:
          'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]',
      },
      inset: {
        rootGap:
          'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]',
        rootWrapper:
          'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]',
      },
      sidebar: {
        rootGap: 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
        rootWrapper:
          'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
      },
    },
    side: {
      right: {
        rootWrapper: clsx(
          'right-0',
          'group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
        ),
      },
      left: {
        rootWrapper: clsx(
          'left-0',
          'group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
        ),
      },
    },
    showOnHover: {
      true: {
        menuAction: clsx(
          'peer-data-[active=true]/menu-button:text-grey-text-contrast group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100',
          'data-[state=open]:opacity-100 md:opacity-0',
        ),
      },
      false: {},
    },
    size: {
      small: {
        menuSubButton: 'text-xs',
      },
      medium: {
        menuSubButton: 'text-sm',
      },
    },
  },
});

const {
  provider,
  rootNoCollapsible,
  rootIsMobile,
  rootGap,
  rootWrapper,
  rootChild,
  trigger,
  rail,
  inset,
  input,
  header,
  footer,
  separator,
  content,
  group,
  groupLabel,
  groupAction,
  groupContent,
  menu,
  item,
  menuAction,
  menuBadge,
  skeleton,
  menuSub,
  menuSubButton,
} = sidebarStyles();

const sidebarMenuButtonStyles = tv({
  base: clsx(
    'peer/menu-button ring-grey-focus-ring flex w-full items-center gap-2 overflow-hidden p-2 text-left text-sm outline-none transition-[width,height,padding]',
    'hover:bg-grey-bg-hover hover:text-grey-text-contrast',
    'active:bg-grey-bg-active active:text-grey-text-contrast',
    'focus-visible:ring-4',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[active=true]:bg-grey-bg-active data-[active=true]:text-grey-text-contrast data-[active=true]:font-medium',
    'data-[state=open]:hover:bg-grey-bg-active data-[state=open]:hover:text-grey-text-contrast',
    'group-has-[[data-sidebar=menu-action]]/menu-item:pr-8',
    'group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2',
    '[&>svg]:size-4 [&>svg]:shrink-0',
    '[&>span:last-child]:truncate',
  ),
  variants: {
    variant: {
      default: 'hover:bg-grey-bg-hover hover:text-grey-text-contrast',
      outline: clsx(
        'bg-grey-base shadow-[0_0_0_1px_hsl(var(--grey-7))]',
        'hover:bg-grey-bg-hover hover:text-grey-text-contrast hover:shadow-[0_0_0_1px_hsl(var(--grey-7))]',
      ),
    },
    size: {
      small: 'h-7 text-xs rounded-lg',
      medium: 'h-8 text-sm rounded-lg',
      large: clsx(
        'h-12 text-sm rounded-xl',
        'group-data-[collapsible=icon]:!p-0',
      ),
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'medium',
  },
});

type SidebarContext = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContext | null>(null);

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
};

type SidebarProvoderProps = React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const SidebarProvider = forwardRef<HTMLDivElement, SidebarProvoderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const [openMobile, setOpenMobile] = useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? 'expanded' : 'collapsed';

    const contextValue = useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            ref={ref}
            className={provider({ className })}
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH,
                '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);

SidebarProvider.displayName = 'SidebarProvider';

type SidebarProps = React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
};

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === 'none') {
      return (
        <div ref={ref} className={rootNoCollapsible({ className })} {...props}>
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            className={rootIsMobile()}
            data-mobile='true'
            data-sidebar='sidebar'
            side={side}
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
          >
            <div className='flex h-full w-full flex-col'>{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className='group peer hidden md:block'
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-side={side}
        data-state={state}
        data-variant={variant}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div className={rootGap({ variant })} />
        <div className={rootWrapper({ side, variant, className })} {...props}>
          <div className={rootChild()} data-sidebar='sidebar'>
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Sidebar.displayName = 'Sidebar';

type SidebarTriggerRef = React.ElementRef<typeof Button>;
type SidebarTriggerProps = React.ComponentProps<typeof Button>;

const SidebarTrigger = forwardRef<SidebarTriggerRef, SidebarTriggerProps>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        icon
        className={trigger({ className })}
        data-sidebar='trigger'
        variant='ghost'
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
        <span className='sr-only'>Toggle Sidebar</span>
      </Button>
    );
  },
);

SidebarTrigger.displayName = 'SidebarTrigger';

type SidebarRailProps = React.ComponentProps<'button'>;

const SidebarRail = forwardRef<HTMLButtonElement, SidebarRailProps>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        aria-label='Toggle Sidebar'
        className={rail({ className })}
        data-sidebar='rail'
        tabIndex={-1}
        title='Toggle Sidebar'
        onClick={toggleSidebar}
        {...props}
      />
    );
  },
);

SidebarRail.displayName = 'SidebarRail';

type SidebarInsetProps = React.ComponentProps<'main'>;

const SidebarInset = forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, ...props }, ref) => {
    return <main ref={ref} className={inset({ className })} {...props} />;
  },
);

SidebarInset.displayName = 'SidebarInset';

type SidebarInputRef = React.ElementRef<typeof Input>;
type SidebarInputProps = React.ComponentProps<typeof Input>;

const SidebarInput = forwardRef<SidebarInputRef, SidebarInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={input({ className })}
        data-sidebar='input'
        {...props}
      />
    );
  },
);

SidebarInput.displayName = 'SidebarInput';

type SidebarHeaderProps = React.ComponentProps<'div'>;

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={header({ className })}
        data-sidebar='header'
        {...props}
      />
    );
  },
);

SidebarHeader.displayName = 'SidebarHeader';

type SidebarFooterProps = React.ComponentProps<'div'>;

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={footer({ className })}
        data-sidebar='footer'
        {...props}
      />
    );
  },
);

SidebarFooter.displayName = 'SidebarFooter';

type SidebarSeparatorRef = React.ElementRef<typeof Separator>;
type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;

const SidebarSeparator = forwardRef<SidebarSeparatorRef, SidebarSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        className={separator({ className })}
        data-sidebar='separator'
        {...props}
      />
    );
  },
);

SidebarSeparator.displayName = 'SidebarSeparator';

type SidebarContentProps = React.ComponentProps<'div'>;

const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={content({ className })}
        data-sidebar='content'
        {...props}
      />
    );
  },
);

SidebarContent.displayName = 'SidebarContent';

type SidebarGroupProps = React.ComponentProps<'div'>;

const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={group({ className })}
        data-sidebar='group'
        {...props}
      />
    );
  },
);

SidebarGroup.displayName = 'SidebarGroup';

type SidebarGroupLabelProps = React.ComponentProps<'div'> & {
  asChild?: boolean;
};

const SidebarGroupLabel = forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={groupLabel({ className })}
        data-sidebar='group-label'
        {...props}
      />
    );
  },
);

SidebarGroupLabel.displayName = 'SidebarGroupLabel';

type SidebarGroupActionProps = React.ComponentProps<'button'> & {
  asChild?: boolean;
};

const SidebarGroupAction = forwardRef<
  HTMLButtonElement,
  SidebarGroupActionProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={groupAction({ className })}
      data-sidebar='group-action'
      {...props}
    />
  );
});

SidebarGroupAction.displayName = 'SidebarGroupAction';

type SidebarGroupContentProps = React.ComponentProps<'div'>;

const SidebarGroupContent = forwardRef<
  HTMLDivElement,
  SidebarGroupContentProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={groupContent({ className })}
    data-sidebar='group-content'
    {...props}
  />
));

SidebarGroupContent.displayName = 'SidebarGroupContent';

type SidebarMenuProps = React.ComponentProps<'ul'>;

const SidebarMenu = forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={menu({ className })}
      data-sidebar='menu'
      {...props}
    />
  ),
);

SidebarMenu.displayName = 'SidebarMenu';

type SidebarMenuItemProps = React.ComponentProps<'li'>;

const SidebarMenuItem = forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={item({ className })}
      data-sidebar='menu-item'
      {...props}
    />
  ),
);

SidebarMenuItem.displayName = 'SidebarMenuItem';

type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonStyles>;
type SidebarMenuButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & SidebarMenuButtonVariants;

const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  (
    {
      asChild = false,
      isActive = false,
      variant = 'default',
      size = 'medium',
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        className={sidebarMenuButtonStyles({ variant, size, className })}
        data-active={isActive}
        data-sidebar='menu-button'
        data-size={size}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === 'string') {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          align='center'
          hidden={state !== 'collapsed' || isMobile}
          side='right'
          {...tooltip}
        />
      </Tooltip>
    );
  },
);

SidebarMenuButton.displayName = 'SidebarMenuButton';

type SidebarMenuActionProps = React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
};

const SidebarMenuAction = forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
  ({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={menuAction({ showOnHover, className })}
        data-sidebar='menu-action'
        {...props}
      />
    );
  },
);

SidebarMenuAction.displayName = 'SidebarMenuAction';

type SidebarMenuBadgeProps = React.ComponentProps<'div'>;

const SidebarMenuBadge = forwardRef<HTMLDivElement, SidebarMenuBadgeProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={menuBadge({ className })}
      data-sidebar='menu-badge'
      {...props}
    />
  ),
);

SidebarMenuBadge.displayName = 'SidebarMenuBadge';

type SidebarMenuSkeletonProps = React.ComponentProps<'div'> & {
  showIcon?: boolean;
};

const SidebarMenuSkeleton = forwardRef<
  HTMLDivElement,
  SidebarMenuSkeletonProps
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      className={skeleton({ className })}
      data-sidebar='menu-skeleton'
      {...props}
    >
      {showIcon && (
        <Skeleton
          className='size-4 rounded-md'
          data-sidebar='menu-skeleton-icon'
        />
      )}
      <Skeleton
        className='h-4 max-w-[--skeleton-width] flex-1'
        data-sidebar='menu-skeleton-text'
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});

SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

type SidebarMenuSubProps = React.ComponentProps<'ul'>;

const SidebarMenuSub = forwardRef<HTMLUListElement, SidebarMenuSubProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={menuSub({ className })}
      data-sidebar='menu-sub'
      {...props}
    />
  ),
);

SidebarMenuSub.displayName = 'SidebarMenuSub';

type SidebarMenuSubItemProps = React.ComponentProps<'li'>;

const SidebarMenuSubItem = forwardRef<HTMLLIElement, SidebarMenuSubItemProps>(
  ({ ...props }, ref) => <li ref={ref} {...props} />,
);
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

type SidebarMenuSubButtonProps = React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'small' | 'medium';
  isActive?: boolean;
};

const SidebarMenuSubButton = forwardRef<
  HTMLAnchorElement,
  SidebarMenuSubButtonProps
>(
  (
    { asChild = false, size = 'medium', isActive, className, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'a';

    return (
      <Comp
        ref={ref}
        className={menuSubButton({ size, className })}
        data-active={isActive}
        data-sidebar='menu-sub-button'
        data-size={size}
        {...props}
      />
    );
  },
);

SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
