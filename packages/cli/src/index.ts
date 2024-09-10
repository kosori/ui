#!/usr/bin/env node
import { Command } from 'commander';

import packageJson from '../package.json';
import { add } from './commands/add';
import { init } from './commands/init';

const main = () => {
  const program = new Command();
  program
    .name('kosori')
    .description('Kõsori CLI')
    .version(
      packageJson.version || '1.0.0',
      '-v, --version',
      'display the current version',
    );

  program.addCommand(init).addCommand(add);

  program.parse();
};

main();
