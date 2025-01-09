import { promises as fs } from 'fs';
import path from 'path';
import * as p from '@clack/prompts';
import { Command } from 'commander';

import type { ProjectInfo } from './types';
import { handleError } from '~/utils/handle-error';
import { highlighter } from '~/utils/highlighter';
import { logger } from '~/utils/logger';
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
  .action(async (opts) => {
    try {
      const options = InitOptions.parse(opts);

      p.intro(highlighter.bgInfo(highlighter.bold(' @kosori/cli init ')));

      await runInit(options);

      p.outro(
        `${highlighter.success('Success!')} Project initialization completed.\n   You may now add components/hooks.`,
      );
    } catch (error) {
      handleError(error);
    }
  });

const runInit = async (options: InitOptions) => {
  let projectInfo!: ProjectInfo;

  await p.tasks([
    {
      title: 'Cheking requirements',
      task: async () => {
        const { projectInfo: pi } = await validateProject(options);
        projectInfo = pi;
        return 'Requirements fulfilled';
      },
    },
  ]);

  logger.info(
    `Your project uses ${highlighter.info(projectInfo.framework.label)}.\nAnd the alias prefix is ${highlighter.info(projectInfo.aliasPrefix)}.`,
  );

  const { resolvedPaths, ...projectConfig } = await createOrLoadProjectConfig(
    options.cwd,
  );

  if (!options.yes) {
    const shouldContinue = await p.confirm({
      message: 'Write configuration and files. Proceed?',
    });

    if (p.isCancel(shouldContinue) || !shouldContinue) {
      p.cancel(
        `Operation cancelled. No changes were made to your project.\n   To skip this prompt and proceed automatically next time, run the ${highlighter.bold('init')} command with the ${highlighter.bold('--yes')} flag.`,
      );
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
