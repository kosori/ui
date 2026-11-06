import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from '@/components/ui/number-field';

const NumberFieldExample = () => (
  <NumberField defaultValue={0}>
    <NumberFieldScrubArea label='Quantity' />
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
);

export default NumberFieldExample;
