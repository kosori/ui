import { Field, FieldDescription, FieldLabel } from '@/registry/kaze/field';
import { Input } from '@/registry/kaze/input';

const FieldExample = () => (
  <div className='flex w-full max-w-sm flex-col gap-4'>
    <Field>
      <FieldLabel htmlFor='kosori-name'>Name</FieldLabel>
      <Input id='kosori-name' placeholder='kosori' />
      <FieldDescription>Shown on your public profile.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor='kosori-email'>Email</FieldLabel>
      <Input id='kosori-email' placeholder='you@example.com' type='email' />
    </Field>
  </div>
);

export { FieldExample };
