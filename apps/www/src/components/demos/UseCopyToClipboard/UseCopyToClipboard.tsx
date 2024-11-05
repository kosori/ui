'use client';

import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';

import { useCopyToClipboard } from '@kosori/hooks/use-copy-to-clipboard';
import { Button } from '@kosori/ui/button';
import { Label } from '@kosori/ui/label';

export const UseCopyToClipboardDemo = () => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const fakeApiKey = '4a5e1e8e-37e8-4154-82e9-6c53e0cdb567';

  return (
    <div>
      <Label>Fake API Key</Label>
      <div className='relative rounded-lg bg-grey-bg p-4 pr-12'>
        <pre className='text-sm'>
          <code>{fakeApiKey}</code>
        </pre>

        <Button
          icon
          className='absolute right-2 top-2.5'
          size='small'
          variant='outline'
          onClick={() => copyToClipboard(fakeApiKey)}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>
    </div>
  );
};
