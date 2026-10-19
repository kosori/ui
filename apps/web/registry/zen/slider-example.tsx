import { Field, FieldLabel } from '@/components/ui/field';
import { Slider, SliderValue } from '@/components/ui/slider';

const SliderExample = () => (
  <Field>
    <Slider defaultValue={50}>
      <div className='mb-2 flex items-center justify-between gap-1'>
        <FieldLabel className='font-medium text-sm'>Opacity</FieldLabel>
        <SliderValue />
      </div>
    </Slider>
  </Field>
);

export default SliderExample;
