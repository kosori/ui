import { BugIcon, LightbulbIcon, MessageCircleIcon } from 'lucide-react';

export const Contribute = () => {
  return (
    <div className='text-fd-muted-foreground mt-4 text-sm'>
      <span className='text-muted-fd-primary'>Contribute</span>
      <div className='mt-2 space-y-1'>
        <a
          className='hover:text-fd-primary flex items-center gap-x-2 transition-colors'
          href='https://github.com/kosori/ui/issues/new?assignees=&labels=%F0%9F%90%9E%E2%9D%94+unconfirmed+bug&projects=&template=bug_report.yml&title=bug%3A+'
          rel='noreferrer'
          target='_blank'
        >
          <BugIcon className='size-3.5' />
          Report a bug
        </a>

        <a
          className='hover:text-fd-primary flex items-center gap-x-2 transition-colors'
          href='https://github.com/kosori/ui/discussions/new?category=ideas'
          rel='noreferrer'
          target='_blank'
        >
          <LightbulbIcon className='size-3.5' />
          New ideas
        </a>

        <a
          className='hover:text-fd-primary flex items-center gap-x-2 transition-colors'
          href='https://github.com/kosori/ui/discussions/new/choose'
          rel='noreferrer'
          target='_blank'
        >
          <MessageCircleIcon className='size-3.5' />
          Start a discussion
        </a>
      </div>
    </div>
  );
};
