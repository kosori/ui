'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import {
  type Context,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';

import { useMotionTransition } from '@/lib/motion';
import {
  type SegmentedControlSize,
  segmentedControlIndicatorSurfaceClassName,
  segmentedControlItemLayoutClassName,
  segmentedControlItemSizeClassNames,
  tabsIndicatorClassName,
} from '@/lib/segmented-control';

type TabsVariant = 'default' | 'underline' | 'line';
type TabsSize = SegmentedControlSize;

const tabsListUnderlineClassName =
  'data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent';

export const tabsListVariants = cva(
  'relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-muted-foreground data-[orientation=vertical]:flex-col',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'rounded-lg bg-muted p-0.5 text-muted-foreground/72',
        line: tabsListUnderlineClassName,
        underline: tabsListUnderlineClassName,
      },
    },
  }
);

const TabsListContext: Context<TabsSize> = createContext<TabsSize>('default');

/** The offset of the active item from the list's unscrolled padding box. */
const activeItemOffset = (list: HTMLElement, tab: HTMLElement) => {
  const listRect = list.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();

  return {
    height: tabRect.height,
    left: tabRect.left - listRect.left + list.scrollLeft - list.clientLeft,
    top: tabRect.top - listRect.top + list.scrollTop - list.clientTop,
    width: tabRect.width,
  };
};

type TabsIndicatorProps = React.ComponentProps<typeof motion.span> & {
  underline: boolean;
};

/**
 * Keep one highlight aligned with the measured active tab, springing it to the
 * new offset whenever the selection or the layout changes.
 */
function TabsIndicator({
  className,
  underline,
  style,
  ...props
}: TabsIndicatorProps): React.ReactElement {
  const transition = useMotionTransition('snappy');
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const measurement = useRef<{ settled: boolean }>({ settled: false });
  const latest = useRef({ reduce, transition });

  useLayoutEffect(() => {
    latest.current = { reduce, transition };
  });

  useLayoutEffect(() => {
    const element = elementRef.current;
    const list = element?.parentElement;
    if (!(element && list)) {
      return;
    }

    const measure = () => {
      const tab = list.querySelector<HTMLElement>(
        '[data-slot="tabs-tab"][aria-selected="true"]'
      );
      if (!tab) {
        return;
      }

      const offset = activeItemOffset(list, tab);
      const vertical =
        element
          .closest('[data-slot="tabs"]')
          ?.getAttribute('data-orientation') === 'vertical';
      const targets = underline
        ? vertical
          ? {
              height: offset.height,
              width: 2,
              x: offset.left - 1,
              y: offset.top,
            }
          : {
              height: 2,
              width: offset.width,
              x: offset.left,
              y: offset.top + offset.height - 1,
            }
        : {
            height: offset.height,
            width: offset.width,
            x: offset.left,
            y: offset.top,
          };
      const apply = (value: typeof x, target: number) => {
        if (!measurement.current.settled || latest.current.reduce) {
          value.set(target);
          return;
        }

        animate(value, target, latest.current.transition);
      };

      apply(x, targets.x);
      apply(y, targets.y);
      apply(width, targets.width);
      apply(height, targets.height);
      measurement.current.settled = true;
    };

    measure();

    const resize = new ResizeObserver(measure);
    resize.observe(list);

    const mutations = new MutationObserver(measure);
    mutations.observe(list, {
      attributeFilter: ['aria-selected'],
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      resize.disconnect();
      mutations.disconnect();
    };
  }, [height, underline, width, x, y]);

  return (
    <motion.span
      {...props}
      className={className}
      hidden={undefined}
      ref={elementRef}
      style={{ ...style, height, width, x, y }}
    />
  );
}

export function Tabs({
  className,
  ...props
}: TabsPrimitive.Root.Props): React.ReactElement {
  return (
    <TabsPrimitive.Root
      className={cn(
        'flex flex-col gap-2 data-[orientation=vertical]:flex-row',
        className
      )}
      data-slot='tabs'
      {...props}
    />
  );
}

export function TabsList({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  size?: TabsSize;
  variant?: TabsVariant;
}): React.ReactElement {
  const underline = variant === 'underline' || variant === 'line';

  return (
    <TabsPrimitive.List
      className={cn(tabsListVariants({ variant }), className)}
      data-size={size}
      data-slot='tabs-list'
      {...props}
    >
      <TabsListContext.Provider value={size}>
        {children}
      </TabsListContext.Provider>
      <TabsPrimitive.Indicator
        className={cn(
          tabsIndicatorClassName,
          underline
            ? 'z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5'
            : cn('-z-1', segmentedControlIndicatorSurfaceClassName)
        )}
        data-slot='tab-indicator'
        render={<TabsIndicator underline={underline} />}
      />
    </TabsPrimitive.List>
  );
}

export function TabsTab({
  className,
  size,
  ...props
}: TabsPrimitive.Tab.Props & {
  size?: TabsSize;
}): React.ReactElement {
  const contextSize: TabsSize = useContext(TabsListContext);
  const resolvedSize: TabsSize = size ?? contextSize;

  return (
    <TabsPrimitive.Tab
      className={cn(
        'relative flex shrink-0 grow cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent font-medium text-base outline-none transition-[color,background-color,box-shadow] hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-active:text-foreground data-disabled:opacity-64 sm:text-sm',
        segmentedControlItemLayoutClassName,
        segmentedControlItemSizeClassNames[resolvedSize],
        className
      )}
      data-size={resolvedSize}
      data-slot='tabs-tab'
      {...props}
    />
  );
}

export function TabsPanel({
  className,
  ...props
}: TabsPrimitive.Panel.Props): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      className={cn('flex-1 outline-none', className)}
      data-slot='tabs-content'
      {...props}
    />
  );
}

const Primitive = TabsPrimitive;

export {
  Primitive as TabsPrimitive,
  TabsPanel as TabsContent,
  type TabsSize,
  TabsTab as TabsTrigger,
  type TabsVariant,
};
