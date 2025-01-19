import { clsx } from 'clsx/lite';

import { Slider } from '@kosori/ui/slider';

type SliderProps = React.ComponentProps<typeof Slider>;

export const SliderDemo = ({ className, ...props }: SliderProps) => {
  return (
    <Slider
      className={clsx('w-3/5', className)}
      defaultValue={[50]}
      max={100}
      step={1}
      {...props}
    />
  );
};
