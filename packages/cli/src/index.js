// Note: Shebang gets added by Rollup

import yargs from 'yargs';
import startBuild from './build';
import { startWatching } from './webpack';

// eslint-disable-next-line no-unused-expressions
yargs
  .command({
    command: 'build',
    aliases: ['compile'],
    desc: 'Bundles and pre-renders your app',
    handler: startBuild
  })
  .command({
    command: 'watch',
    desc: 'Watches app files for changes and recompiles',
    handler: startWatching
  })
  .demandCommand()
  .help().argv;
