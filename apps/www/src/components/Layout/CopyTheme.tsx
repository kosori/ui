'use client';

import { clsx } from 'clsx/lite';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { CopyIcon } from 'lucide-react';

import { Button } from '@kosori/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@kosori/ui/popover';
import { Separator } from '@kosori/ui/separator';

import { borderRadius, colors } from '~/config/theme';
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
          'w-[calc(var(--radix-popover-content-available-width)-2rem)] -translate-x-4',
          'data-[state=closed]:slide-out-to-left-4',
          'data-[state=open]:slide-in-from-left-4',
          'min-[440px]:w-96 min-[440px]:-translate-x-8',
          'min-[440px]:data-[state=closed]:slide-out-to-left-8',
          'min-[440px]:data-[state=open]:slide-in-from-left-8',
          'min-[460px]:-translate-x-11',
          'min-[460px]:data-[state=closed]:slide-out-to-left-11',
          'min-[460px]:data-[state=open]:slide-in-from-left-11',
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
          <DynamicCodeBlock
            code={`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: ${borderRadius.find((br) => br.value === config.radius)?.size};

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `    --primary-${i + 1}: ${colors.find((c) => c.color === config['primary-color'])?.steps.light[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `    --grey-${i + 1}: ${colors.find((c) => c.color === config['grey-color'])?.steps.light[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `    --info-${i + 1}: ${colors.find((c) => c.color === config['info-color'])?.steps.light[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `    --success-${i + 1}: ${colors.find((c) => c.color === config['success-color'])?.steps.light[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `    --warning-${i + 1}: ${colors.find((c) => c.color === config['warning-color'])?.steps.light[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `    --error-${i + 1}: ${colors.find((c) => c.color === config['error-color'])?.steps.light[i]};`,
  )
  .join('\n')}

    .dark {
${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `      --primary-${i + 1}: ${colors.find((c) => c.color === config['primary-color'])?.steps.dark[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `      --grey-${i + 1}: ${colors.find((c) => c.color === config['grey-color'])?.steps.dark[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `      --info-${i + 1}: ${colors.find((c) => c.color === config['info-color'])?.steps.dark[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `      --success-${i + 1}: ${colors.find((c) => c.color === config['success-color'])?.steps.dark[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `      --warning-${i + 1}: ${colors.find((c) => c.color === config['warning-color'])?.steps.dark[i]};`,
  )
  .join('\n')}

${new Array(12)
  .fill(0)
  .map(
    (_, i) =>
      `      --error-${i + 1}: ${colors.find((c) => c.color === config['error-color'])?.steps.dark[i]};`,
  )
  .join('\n')}
    }
  }
}`}
            lang='css'
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
