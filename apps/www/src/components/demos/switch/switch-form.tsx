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
} from '@kosori/ui/form';
import { Switch } from '@kosori/ui/switch';
import { toast } from '@kosori/ui/toast';

const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

export const SwitchFormDemo = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      security_emails: true,
    },
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
        className='w-full max-w-lg space-y-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <h3 className='mb-4 text-lg font-medium'>Email Notifications</h3>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='marketing_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel>Marketing emails</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='security_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel>Security emails</FormLabel>
                    <FormDescription>
                      Receive emails about your account security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      aria-readonly
                      disabled
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
