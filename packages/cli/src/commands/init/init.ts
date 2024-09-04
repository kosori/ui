import { existsSync } from 'fs';
import path from 'path';
import * as p from '@clack/prompts';
import { Command } from 'commander';
import { consola } from 'consola/basic';
import color from 'picocolors';

import { handleError } from '../../utils/handleError';
import { existsConfig, tailwindExists } from './helpers';
import { createConfig } from './helpers/createConfig';
import { getProjectConfig } from './helpers/getProjectInfo';
import { uiPrompts } from './prompts';
import { initOptionsSchema, typeSchema } from './schema';

export const init = new Command()
  .name('init')
  .description('initializes your project')
  .argument('<type>', 'the type to initialize')
  .option('-y, --yes', 'skip confirmation prompt', false)
  .option('-d, --defaults', 'use the default configuration', false)
  .option(
    '-c, --cwd <path>',
    'the working directory. defaults to current working directory',
    process.cwd(),
  )
  .option('-s, --silent', 'no output', false)
  .action(async (cliType, opts) => {
    try {
      const type = typeSchema.parse(cliType);
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        throw new Error(`Directory ${cwd} does not exist`);
      }

      if (type === 'ui') {
        await tailwindExists({ cwd });
        await existsConfig({ cwd });

        const projectConfig = await getProjectConfig({ cwd });

        p.intro(color.bgCyan(color.black(' UI ')));

        if (!projectConfig) throw new Error('Failed to get project config');

        const project = await p.group(uiPrompts);

        try {
          const spin = p.spinner();
          spin.start();
          spin.message('Initializing project...');

          createConfig({ config: projectConfig });

          spin.stop();
        } catch (error) {
          console.error(error);
        }

        p.outro(color.bgCyan(color.black(' Success! ')));
      }
    } catch (error) {
      handleError(error);
    }
  });
