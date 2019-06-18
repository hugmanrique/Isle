// Note: Shebang gets added by Rollup

import yargs from 'yargs';
import isle from '@isle/core';

// eslint-disable-next-line no-unused-expressions
yargs
  .command({
    command: 'build',
    aliases: ['compile'],
    desc: 'Bundles and pre-renders your app',
    handler: () => isle()
  })
  .command({
    command: 'watch',
    desc: 'Watches app files for changes and recompiles',
    handler: () => isle({ watch: true })
  })
  .demandCommand()
  .help().argv;
