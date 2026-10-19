'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormExample = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Form className='flex w-full max-w-64 flex-col gap-4' onSubmit={onSubmit}>
      <Field name='email'>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder='you@example.com' required type='email' />
        <FieldError>Please enter a valid email.</FieldError>
      </Field>
      <Button loading={loading} type='submit'>
        Submit
      </Button>
      {submitted ? (
        <p className='text-muted-foreground text-sm'>Form submitted.</p>
      ) : null}
    </Form>
  );
};

export default FormExample;
