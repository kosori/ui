'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { Slider, SliderValue } from '@/components/ui/slider';

/** Name the slider thumb for assistive technology. */
const getOpacityLabel = () => 'Opacity';

const SliderExample = () => (
  <Field>
    <Slider defaultValue={50} getAriaLabel={getOpacityLabel}>
      <div className='mb-2 flex items-center justify-between gap-1'>
        <FieldLabel>Opacity</FieldLabel>
        <SliderValue />
      </div>
    </Slider>
  </Field>
);

export default SliderExample;
