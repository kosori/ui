import {
  Field,
  FieldDescription,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const FieldExample = () => (
  <Fieldset className='flex w-full flex-col gap-6'>
    <FieldsetLegend>Billing Details</FieldsetLegend>
    <Field>
      <FieldLabel>Company</FieldLabel>
      <Input placeholder='Enter company name' type='text' />
      <FieldDescription>
        The name that will appear on invoices.
      </FieldDescription>
    </Field>

    <Field>
      <FieldLabel>Tax ID</FieldLabel>
      <Input placeholder='Enter tax identification number' type='text' />
      <FieldDescription>
        Your business tax identification number.
      </FieldDescription>
    </Field>
  </Fieldset>
);

export default FieldExample;
