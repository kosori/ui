import * as p from '@clack/prompts';
import { Command } from 'commander';

export const add = new Command()
  .name('add')
  .description('add components, hooks, etc.')
  .argument('[type]', 'the type (components, hooks, etc) to add')
  .argument('[components/hooks/etc...]', 'the components, hooks, etc to add')
  .option('-y, --yes', 'skip confirmation prompt', false)
  .option('-o, --overwrite', 'overwrite existing files', false)
  .option(
    '-c, --cwd <path>',
    'the working directory. defaults to current working directory',
    process.cwd(),
  )
  .option('-a, --all', 'add all the components, hooks, etc available', false)
  .option('-p, --path <path>', 'the path to add the components, hooks, etc to')
  .option('-s, --silent', 'no output', false)
  .action(async (cliType, cliItems, opts) => {
    p.intro('🚀 Adding...');

    const project = await p.group(
      {
        ...(!cliType && {
          type: () =>
            p.select({
              message: 'What you want to add?',
              options: [
                { value: 'component', label: 'Component' },
                { value: 'hook', label: 'Hook' },
              ],
              initialValue: 'component',
            }),
        }),
        ...(!cliItems && {
          items: () => p.text({ message: 'What you want to add?' }),
        }),
      },
      { onCancel: () => process.exit(0) },
    );

    p.outro('🎉 Done!');
  });
