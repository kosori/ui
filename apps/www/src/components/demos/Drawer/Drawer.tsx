'use client';

import { useState } from 'react';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

import { Button } from '@kosori/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@kosori/ui/drawer';

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export const DrawerDemo = () => {
  const [goal, setGoal] = useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button variant='outline'>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <div className='flex items-center justify-center space-x-2'>
              <Button
                icon
                className='h-8 w-8 shrink-0 rounded-full'
                disabled={goal <= 200}
                variant='outline'
                onClick={() => onClick(-10)}
              >
                <MinusIcon className='h-4 w-4' />
                <span className='sr-only'>Decrease</span>
              </Button>
              <div className='flex-1 text-center'>
                <div className='text-7xl font-bold tracking-tighter'>
                  {goal}
                </div>
                <div className='text-[0.70rem] uppercase text-grey-text'>
                  Calories/day
                </div>
              </div>
              <Button
                icon
                className='h-8 w-8 shrink-0 rounded-full'
                disabled={goal >= 400}
                variant='outline'
                onClick={() => onClick(10)}
              >
                <PlusIcon className='h-4 w-4' />
                <span className='sr-only'>Increase</span>
              </Button>
            </div>
            <div className='mt-3 h-[120px]'>
              <ResponsiveContainer height='100%' width='100%'>
                <BarChart data={data}>
                  <Bar
                    dataKey='goal'
                    style={
                      {
                        fill: 'hsl(var(--primary-9))',
                        opacity: 1,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button className='w-full'>Submit</Button>
            <DrawerClose asChild>
              <Button className='w-full' variant='outline'>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
