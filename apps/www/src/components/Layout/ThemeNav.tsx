import { GitHubLogoIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';
import { Separator } from '@kosori/ui/separator';

import { XIcon } from '~/components/icons/x';
import { BorderRadiusOption } from './BorderRadiusOption';
import { ColorOption } from './ColorOption';

export const ThemeNav = () => {
  return (
    <div className='fixed bottom-6 right-1/2 flex translate-x-1/2 gap-2 rounded-xl border bg-grey-base p-2 shadow-md'>
      <Button asChild icon variant='ghost'>
        <a
          href='https://github.com/kosori/ui'
          rel='noopener noreferrer'
          target='_blank'
        >
          <GitHubLogoIcon />
          <span className='sr-only'>GitHub repo</span>
        </a>
      </Button>

      <Separator className='h-8' orientation='vertical' />

      <Popover>
        <PopoverTrigger asChild>
          <Button icon variant='ghost'>
            <MixerHorizontalIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-96' sideOffset={14}>
          <h3 className='font-medium'>Customize</h3>
          <p className='text-sm text-grey-text'>Perzonalize the theme.</p>

          <Separator className='my-2' />

          <div className='grid grid-cols-3 gap-2'>
            <ColorOption align='start' dataKey='primary-color' type='primary'>
              Primary
            </ColorOption>

            <ColorOption align='center' dataKey='grey-color' type='grey'>
              Grey
            </ColorOption>

            <ColorOption align='end' dataKey='info-color' type='info'>
              Info
            </ColorOption>

            <ColorOption align='start' dataKey='success-color' type='success'>
              Success
            </ColorOption>

            <ColorOption align='center' dataKey='warning-color' type='warning'>
              Warning
            </ColorOption>

            <ColorOption align='end' dataKey='error-color' type='error'>
              Error
            </ColorOption>

            <BorderRadiusOption />
          </div>
        </PopoverContent>
      </Popover>

      <Separator className='h-8' orientation='vertical' />

      <Button asChild icon variant='ghost'>
        <a
          href='https://x.com/trykosori'
          rel='noopener noreferrer'
          target='_blank'
        >
          <XIcon className='fill-current' />
          <span className='sr-only'>X repo</span>
        </a>
      </Button>
    </div>
  );
};
