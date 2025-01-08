import { promises as fs } from 'fs';
import path from 'path';
import * as p from '@clack/prompts';
import { Command } from 'commander';

import { handleError } from '~/utils/handle-error';
import { highlighter } from '~/utils/highlighter';
import { INITIAL_DEPENDENCIES } from './config/dependencies';
import { createOrLoadProjectConfig } from './helpers/config';
import { installDependencies } from './helpers/dependencies';
import { validateProject } from './helpers/pre-check';
import { generateProjectTemplates } from './helpers/templates';
import { InitOptions } from './schema';

export const init = new Command()
  .name('init')
  .description('initializes your project')
  .option('-y, --yes', 'skip confirmation prompt', false)
  .option('-f, --force', 'overwrite existing files', false)
  .option(
    '-c, --cwd <path>',
    'the working directory. defaults to current working directory',
    process.cwd(),
  )
  .option('-s, --silent', 'no output', false)
  .action(async (opts) => {
    try {
      const options = InitOptions.parse(opts);

      p.intro(highlighter.bgInfo(highlighter.bold(' @kosori/cli init ')));

      await runInit(options);

      p.outro(
        `${highlighter.success('Success!')} Project initialization completed.\n   You may now add components.`,
      );
    } catch (error) {
      handleError(error);
    }
  });

const runInit = async (options: InitOptions) => {
  await validateProject(options);

  const { resolvedPaths, ...projectConfig } = await createOrLoadProjectConfig(
    options.cwd,
  );

  if (!options.yes) {
    const shouldContinue = await p.confirm({
      message: 'Write configuration and files. Proceed?',
    });

    if (p.isCancel(shouldContinue) || !shouldContinue) {
      p.cancel('The configuration was not written.');
      process.exit(0);
    }
  }

  await p.tasks([
    {
      title: 'Writing kosori.config.json',
      task: async () => {
        const file = path.resolve(options.cwd, 'kosori.config.json');
        const data = JSON.stringify(projectConfig, null, 2);
        await fs.writeFile(file, data, 'utf8');
        return 'Configuration written';
      },
    },
    {
      title: 'Writing/updating files',
      task: async () => {
        await generateProjectTemplates(resolvedPaths);
        return 'Files written/updated';
      },
    },
    {
      title: 'Installing dependencies',
      task: async () => {
        await installDependencies(INITIAL_DEPENDENCIES, resolvedPaths.cwd);
        return 'Dependencies installed';
      },
    },
  ]);
};
