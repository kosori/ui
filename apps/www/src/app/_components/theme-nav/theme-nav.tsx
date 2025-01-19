import { BorderRadius } from './border-radius';
import { CopyTheme } from './copy-theme';
import { Palette } from './palette';

export const ThemeNav = () => {
  return (
    <div className='fixed bottom-6 right-1/2 flex translate-x-1/2 gap-2 rounded-xl border bg-grey-base p-2 shadow-md'>
      <BorderRadius />
      <Palette />
      <CopyTheme />
    </div>
  );
};
