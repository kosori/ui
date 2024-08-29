import { BorderRadius } from './BorderRadius';
import { CopyTheme } from './CopyTheme';
import { Palette } from './Palette';

export const ThemeNav = () => {
  return (
    <div className='fixed bottom-6 right-1/2 flex translate-x-1/2 gap-2 rounded-xl border bg-grey-base p-2 shadow-md'>
      <BorderRadius />
      <Palette />
      <CopyTheme />
    </div>
  );
};
