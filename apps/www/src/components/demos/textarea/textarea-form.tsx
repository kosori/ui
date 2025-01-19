'use client';

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
import { Textarea } from '@kosori/ui/textarea';
import { toast } from '@kosori/ui/toast';

const FormSchema = z.object({
  bio: z
    .string({ required_error: 'Bio must be at least 10 characters.' })
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
});

export const TextareaFormDemo = () => {
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
      <form
        className='w-full max-w-md space-y-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className='resize-none'
                  placeholder='Tell us a little bit about yourself'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
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
