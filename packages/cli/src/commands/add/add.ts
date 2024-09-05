import { existsSync } from 'fs';
import path from 'path';
import * as p from '@clack/prompts';
import { Command } from 'commander';
import color from 'picocolors';

import { fetchJson } from '~/utils/fetchJson';
import { handleError } from '~/utils/handleError';
import { initOptionsSchema, itemsSchema, typeSchema } from './schema';

export const add = new Command()
  .name('add')
  .description('add components, hooks, etc.')
  .argument('<type>', 'the type (components, hooks, etc) to add')
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
    try {
      const type = typeSchema.parse(cliType);
      const items = itemsSchema.parse(cliItems);
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);
      const skip = options.yes;

      if (!existsSync(cwd)) {
        throw new Error(`Directory ${cwd} does not exist`);
      }

      if (type === 'components') {
        p.intro(color.bgCyan(color.black(' Add component(s) ')));

        p.outro(color.bgCyan(color.black(' Success! ')));
      }

      p.outro('🎉 Done!');
    } catch (error) {
      handleError(error);
    }
  });
