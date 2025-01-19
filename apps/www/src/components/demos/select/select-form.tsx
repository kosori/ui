'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@kosori/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kosori/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kosori/ui/select';
import { toast } from '@kosori/ui/toast';

const FormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
});

export const SelectFormDemo = () => {
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
      <form className='w-2/3 space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a verified email to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='m@example.com'>m@example.com</SelectItem>
                  <SelectItem value='m@google.com'>m@google.com</SelectItem>
                  <SelectItem value='m@support.com'>m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{' '}
                <Link href='/examples/forms'>email settings</Link>.
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
