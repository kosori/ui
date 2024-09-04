import { existsSync } from 'fs';
import path from 'path';
import * as p from '@clack/prompts';
import { Command } from 'commander';
import color from 'picocolors';

import { handleError } from '~/utils/handleError';
import { highlight } from '~/utils/highlight';
import { createConfig } from './helpers/createConfig';
import { existsConfig, tailwindExists } from './helpers/exists';
import { getProjectConfig } from './helpers/getProjectInfo';
import { writeTemplates } from './helpers/writeTemplates';
import { initOptionsSchema, typeSchema } from './schema';

export const init = new Command()
  .name('init')
  .description('initializes your project')
  .argument('<type>', 'the type to initialize')
  .option('-y, --yes', 'skip confirmation prompt', false)
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
      const skip = options.yes;

      if (!existsSync(cwd)) {
        throw new Error(`Directory ${cwd} does not exist`);
      }

      if (type === 'ui') {
        await tailwindExists({ cwd });
        await existsConfig({ cwd });

        const projectConfig = await getProjectConfig({ cwd });

        p.intro(color.bgCyan(color.black(' UI ')));

        if (!projectConfig) throw new Error('Failed to get project config');
        const { resolvedPaths: _, ...config } = projectConfig;

        try {
          const spin = p.spinner();

          if (!skip) {
            const shouldContinue = await p.confirm({
              message: `Write configuration to ${highlight('kosori.config.json')}?`,
            });

            if (shouldContinue === false) {
              p.outro(color.bgCyan(color.black(' Aborted! ')));
              return;
            }
          }

          spin.start();
          spin.message('Creating config...');
          await createConfig({ cwd, config });
          spin.stop('Config created!');

          if (!skip) {
            const shouldContinue = await p.confirm({
              message: `Write ${highlight('globals.css')}, ${highlight('tailwind.config.ts')} and ${highlight('cn.ts')} files?`,
            });

            if (shouldContinue === false) {
              p.outro(color.bgCyan(color.black(' Aborted! ')));
              return;
            }
          }

          spin.start();
          spin.message('Writing templates...');
          await writeTemplates({ projectConfig });
          spin.stop('Files written!');
        } catch (error) {
          console.error(error);
        }

        p.outro(color.bgCyan(color.black(' Success! ')));
      }
    } catch (error) {
      handleError(error);
    }
  });
