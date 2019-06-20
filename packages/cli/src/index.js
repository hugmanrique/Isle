// Note: Shebang gets added by Rollup

import yargs from 'yargs';
import isle from '@isle/core';

// eslint-disable-next-line no-unused-expressions
yargs
  .command({
    command: 'build',
    aliases: ['compile'],
    desc: 'Bundles and pre-renders your app',
    handler: () => isle({ mode: 'production' })
  })
  .command({
    command: 'watch',
    desc: 'Watches app files for changes and recompiles',
    handler: () => isle({ mode: 'development', watch: true })
  })
  .command({
    command: 'serve [port]',
    aliases: ['dev', 'devserve', 'devserver'],
    desc: 'Serves Isle app and updates browser on changes',
    builder: args =>
      args.positional('port', {
        describe: 'Port to bind on',
        alias: 'p',
        type: 'number'
      }),
    handler: argv => {
      const listenPort = argv.port;

      if (listenPort) {
        process.env.ISLE_DEV_PORT = listenPort;
      }

      isle({ mode: 'development', devServer: true });
    }
  })
  .demandCommand()
  .help().argv;
