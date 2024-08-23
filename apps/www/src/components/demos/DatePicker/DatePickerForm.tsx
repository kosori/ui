'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@kosori/ui';
import { Button } from '@kosori/ui/button';
import { Calendar } from '@kosori/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kosori/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';
import { toast } from '@kosori/ui/toast';

const FormSchema = z
  .object({
    dob: z.date().optional(),
  })
  .refine((data) => data.dob !== undefined, {
    message: 'A date of birth is required.',
    path: ['dob'],
  });

export const DatePickerFormDemo = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <div className='[&_figure]:mb-0 [&_figure]:mt-1'>
          <CodeBlock lang='json'>
            <Pre>{JSON.stringify(data, null, 2)}</Pre>
          </CodeBlock>
        </div>
      ),
    });
  };

  return (
    <Form {...form}>
      <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      className={cn(
                        'w-[242px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                      variant={'outline'}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align='start' className='w-auto p-0'>
                  <Calendar
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
