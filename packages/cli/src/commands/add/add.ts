import path from 'path';
import * as p from '@clack/prompts';
import { Command } from 'commander';

import type { Config } from '~/schema';
import { handleError } from '~/utils/handle-error';
import { highlighter } from '~/utils/highlighter';
import { ComponentManager } from './helpers/components';
import { validateProject } from './helpers/pre-check';
import { InitOptions, Items, Type } from './schema';

export const add = new Command()
  .name('add')
  .description('add components or hooks')
  .argument('<type>', 'the type (components/hooks) to add')
  .argument('[components/hooks...]', 'the components/hooks to add')
  .option('-y, --yes', 'skip confirmation prompt', false)
  .option('-o, --overwrite', 'overwrite existing files', false)
  .option(
    '-c, --cwd <path>',
    'the working directory. defaults to current working directory',
    process.cwd(),
  )
  .option('-a, --all', 'add all the components/hooks available', false)
  .option('-p, --path <path>', 'the path to add the components/hooks to')
  .action(async (cliType, cliItems, { cwd, ...opts }: { cwd: string }) => {
    try {
      const type = Type.parse(cliType);
      const items = Items.parse(cliItems);
      const options = InitOptions.parse({
        cwd: path.resolve(cwd),
        ...opts,
      });

      p.intro(
        highlighter.bgInfo(
          highlighter.bold(` @kosori/cli ${highlighter.underline('add')} `),
        ),
      );

      await runInit(type, items, options);

      p.outro(
        `${highlighter.success('Success!')} Components/hooks added.\n   You may now start using them.`,
      );
    } catch (error) {
      handleError(error);
    }
  });

export const runInit = async (
  type: Type,
  items: Items,
  options: InitOptions,
) => {
  let config!: Config;

  await p.tasks([
    {
      title: 'Cheking requirements',
      task: async () => {
        const projectConfig = await validateProject(options);
        if (!projectConfig) return '';
        config = projectConfig;
        return 'Requirements fulfilled';
      },
    },
  ]);

  if (type === 'components') {
    const componentManager = new ComponentManager(config, options);
    return await componentManager.installComponents(items);
  }

  if (type === 'hooks') {
    p.outro(
      `${highlighter.error(`Currently, hooks aren't supported. Please use the ${highlighter.bold('@kosori/cli add components')} command instead.`)}`,
    );
    process.exit(0);
  }
};
