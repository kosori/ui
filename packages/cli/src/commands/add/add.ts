import { existsSync } from 'fs';
import path from 'path';
import * as p from '@clack/prompts';
import { Command } from 'commander';
import color from 'picocolors';

import { installDependencies } from '~/utils/dependencies';
import { handleError } from '~/utils/handleError';
import { highlight } from '~/utils/highlight';
import { getPackageManager } from '~/utils/package';
import { writeFiles } from '~/utils/writeFiles';
import { getConfig } from '../init/helpers/config';
import { getComponents } from './helpers/components';
import { formatContent } from './helpers/transform';
import { componentsPrompts } from './prompts';
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
      const overwrite = options.overwrite;
      const skip = options.yes;
      const config = await getConfig({ cwd });

      if (!existsSync(cwd)) {
        throw new Error(`The path ${cwd} does not exist. Please try again.`);
      }

      if (!config) {
        throw new Error(
          `No config found in ${cwd}. Please run ${highlight('init ui')} first.`,
        );
      }

      if (type === 'components') {
        p.intro(color.bgCyan(color.black(' Add component(s) ')));

        try {
          const spin = p.spinner();
          const { componentsToInstall } = items.length
            ? { componentsToInstall: items }
            : await p.group(componentsPrompts, {
                onCancel: () => {
                  p.cancel('Aborted!');
                  process.exit(1);
                },
              });

          const components = await getComponents({
            names: componentsToInstall as string[],
          });

          if (!skip) {
            const shouldContinue = await p.confirm({
              message: `Write components on ${highlight(config.resolvedPaths.ui)}?`,
            });

            if (shouldContinue === false) {
              p.outro(color.bgCyan(color.black(' No components written! ')));
              return;
            }
          }

          const componentsFormatted = await Promise.all(
            components.map(async (component) => ({
              ...component,
              content: await formatContent({
                name: `${component.name}.tsx`,
                content: component.content,
              }),
            })),
          );

          spin.start();
          spin.message('Writing components...');
          await writeFiles({
            dirPath: config.resolvedPaths.ui,
            overwrite,
            files: componentsFormatted.map((component) => ({
              name: `${component.name}.tsx`,
              content: component.content,
            })),
          });
          spin.stop('Components written!');

          if (!skip) {
            const shouldContinue = await p.confirm({
              message: `Install the dependencies?`,
            });

            if (shouldContinue === false) {
              p.outro(
                color.bgCyan(color.black(' No dependencies installed! ')),
              );
              return;
            }
          }

          const dependencies = Array.from(
            new Set(
              components.flatMap((component) => component.dependencies ?? []),
            ),
          );

          const packageManager = await getPackageManager({ targetDir: cwd });

          spin.start();
          spin.message('Installing dependencies...');
          await installDependencies({
            packageManager,
            dependencies,
            targetDir: cwd,
          });
          spin.stop('Dependencies installed!');
        } catch (error) {
          console.error(error);
        }
      }

      p.outro(color.bgCyan(color.black(' Success! ')));
    } catch (error) {
      handleError(error);
    }
  });
