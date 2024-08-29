'use client';

import { Fragment } from 'react';
import { clsx } from 'clsx/lite';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { CopyIcon } from 'lucide-react';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';
import { Separator } from '@kosori/ui/separator';

import type { DataKey } from '~/config/theme';
import { borderRadius, colors, defaultConfig } from '~/config/theme';
import { useThemeConfig } from '~/hooks/use-theme-config';

export const CopyTheme = () => {
  const { config } = useThemeConfig();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          icon
          className={clsx('min-w-9', 'data-[state=open]:bg-grey-bg-active')}
          variant='ghost'
        >
          <CopyIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={clsx(
          'w-96 -translate-x-11',
          'data-[state=closed]:slide-out-to-left-11',
          'data-[state=open]:slide-in-from-left-11',
        )}
        side='top'
        sideOffset={14}
      >
        <h3 className='font-medium'>CSS Variables</h3>
        <p className='text-sm text-grey-text'>
          Copy ans paste the variables into your CSS file.
        </p>

        <Separator className='my-2' />

        <div>
          <CodeBlock
            allowCopy={false}
            className='max-h-[320px] overflow-auto'
            lang='css'
            title='globals.css'
          >
            <Pre>
              <code>
                {Object.keys(defaultConfig)
                  .filter((c) => c !== 'radius')
                  .map((key) => {
                    const color = config[key as DataKey];
                    if (color.startsWith('dark-')) return null;

                    return (
                      <Fragment key={key}>
                        <span className='line'>
                          @import "@radix-ui/colors/{color}
                          .css";
                        </span>
                        <br />
                        <span className='line'>
                          @import "@radix-ui/colors/{color}-dark.css";
                        </span>
                        <br />
                      </Fragment>
                    );
                  })}

                <span className='line'> </span>
                <br />
                <span className='line'>{`:root {`}</span>
                <br />
                <span className='line'>{`  --radius: ${borderRadius.find((br) => br.value === config.radius)?.size};`}</span>

                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['primary-color']}
                  mode='light'
                  type='primary'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['grey-color']}
                  mode='light'
                  type='grey'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['info-color']}
                  mode='light'
                  type='info'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['success-color']}
                  mode='light'
                  type='success'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['warning-color']}
                  mode='light'
                  type='warning'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['error-color']}
                  mode='light'
                  type='error'
                />

                <br />
                <span className='line'> </span>
                <span className='line'>{`  .dark {`}</span>
                <CSSVariables
                  color={config['primary-color']}
                  mode='dark'
                  type='primary'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['grey-color']}
                  mode='dark'
                  type='grey'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['info-color']}
                  mode='dark'
                  type='info'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['success-color']}
                  mode='dark'
                  type='success'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['warning-color']}
                  mode='dark'
                  type='warning'
                />
                <br />
                <span className='line'> </span>
                <CSSVariables
                  color={config['error-color']}
                  mode='dark'
                  type='error'
                />
                <br />
                <span className='line'>{`  }`}</span>

                <br />
                <span className='line'>{`}`}</span>
              </code>
            </Pre>
          </CodeBlock>
        </div>
      </PopoverContent>
    </Popover>
  );
};

type VariablesProps = { type: string; color: string; mode: 'light' | 'dark' };

const CSSVariables = ({ type, color, mode }: VariablesProps) => {
  const steps = colors.find((c) => c.color === color)?.steps?.[mode];

  return new Array(12).fill(0).map((_, i) => (
    <>
      <br />
      <span key={i} className='line'>
        {`${mode === 'dark' ? '  ' : ''}  --${type}-${i + 1}: ${steps ? steps[i] : `var(--${color}${mode === 'dark' ? '-dark' : ''}-${i + 1})`};`}
      </span>
    </>
  ));
};
