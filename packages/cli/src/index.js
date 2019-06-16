// Note: Shebang gets added by Rollup

import logger from '@isle/logger';
import yargs from 'yargs';

// eslint-disable-next-line no-unused-expressions
yargs
  .command({
    command: 'build',
    aliases: ['compile'],
    desc: 'Bundles and pre-renders your app',
    handler: () => {
      logger.info('Starting build process...');
    }
  })
  .demandCommand()
  .help().argv;

/*yargs.command(['build', 'compile'], 'Build the app', {}, argv => {

})*/
