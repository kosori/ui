import { existsSync } from 'fs';
import path from 'path';
import * as p from '@clack/prompts';
import { Command } from 'commander';
import color from 'picocolors';

import { buildPrettifier } from '~/utils/buildPrettifier';
import { installDependencies } from '~/utils/dependencies';
import { handleError } from '~/utils/handle-error';
import { highlight } from '~/utils/highlight';
import { getPackageManager } from '~/utils/package';
import { writeFiles } from '~/utils/writeFiles';
import { getConfig } from '../init/helpers/config';
import { getComponents, getComponentsIndex } from './helpers/components';
import { transform } from './helpers/transform';
import { componentsPrompts } from './prompts';
import { initOptionsSchema, itemsSchema, typeSchema } from './schema';

const prettify = buildPrettifier();

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
        const componentsIndex = await getComponentsIndex();
        p.intro(
          color.bgCyan(
            color.black(` Add ${options.all ? 'all' : ''} component(s) `),
          ),
        );

        try {
          const spin = p.spinner();

          const initialComponents = options.all
            ? componentsIndex.map(({ name }) => name)
            : items.length
              ? items
              : (
                  await p.group(
                    componentsPrompts({ components: componentsIndex }),
                    {
                      onCancel: () => {
                        p.cancel('Aborted!');
                        process.exit(1);
                      },
                    },
                  )
                ).componentsToInstall;

          const requiredComponents = Array.from(
            new Set(
              initialComponents.flatMap((component) => {
                const found = componentsIndex.find(
                  (item) => item.name === component,
                );
                return found?.required ?? [];
              }),
            ),
          );

          const componentsToInstall = Array.from(
            new Set([...initialComponents, ...requiredComponents]),
          );

          const components = await getComponents({
            names: componentsToInstall,
          });

          if (!skip) {
            const shouldContinue = await p.confirm({
              message: `Write components on ${highlight(config.resolvedPaths.ui)}?`,
            });

            if (shouldContinue === false) {
              p.outro(color.bgCyan(color.black(' No component(s) written! ')));
              return;
            }
          }

          const componentsFormatted = await Promise.all(
            components.map(async (component) => ({
              ...component,
              content: await transform({
                config,
                name: `${component.name}.tsx`,
                content: component.content,
              }),
            })),
          );

          spin.start();
          spin.message('Writing components');
          await writeFiles({
            dirPath: config.resolvedPaths.ui,
            // NOTE: we overwrite all the files if the user wants to add all the components
            overwrite: options.all ? true : overwrite,
            files: componentsFormatted.map((component) => ({
              name: `${component.name}.tsx`,
              content: prettify(component.content, 'typescript'),
            })),
          });
          spin.stop('Component(s) written!');

          const dependencies = Array.from(
            new Set(
              components.flatMap((component) => component.dependencies ?? []),
            ),
          );

          if (!dependencies.length) return;

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

          const packageManager = await getPackageManager({ targetDir: cwd });

          spin.start();
          spin.message('Installing dependencies');
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
