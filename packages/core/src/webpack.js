import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import logger from '@isle/logger';

const defaultPort = 4444;

/**
 * Creates a webpack `Compiler` instance with the given config.
 *
 * @param {Object} config - a webpack config object
 * @returns {Compiler} a webpack `Compiler` instance
 */
const createCompiler = config => webpack(config);

/**
 * webpack compile callback that formats log messages.
 *
 * @param {Error} err - an optional compilation error
 * @param {Object} stats - webpack's stat object
 */
function onCompile(err, stats) {
  if (err) {
    logger.error(err);

    // Print detailed information
    if (err.details) {
      logger.error(err.details);
    }

    return;
  }

  // Only construct the warnings and errors for performance
  // https://github.com/facebook/create-react-app/issues/4492#issuecomment-421959548
  const message = stats.toString({
    all: false,
    warnings: true,
    errors: true
  });

  if (stats.hasErrors()) {
    logger.error(message);
  } else if (stats.hasWarnings()) {
    logger.warn(message);
  } else {
    logger.info('Compiled succesfully!');
  }
}

/**
 * Starts a webpack compilation.
 *
 * @param {Object} config - a webpack config object
 * @returns {Promise} called when the compilation is done.
 */
export const runBuild = config =>
  new Promise((resolve, reject) => {
    const compiler = createCompiler(config);

    compiler.run((err, stats) => {
      // Log compile output
      onCompile(err, stats);

      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

/**
 * Starts a webpack watch session.
 *
 * @param {Object} config - a webpack config object
 */
export function runWatch(config) {
  const compiler = createCompiler(config);

  compiler.watch({}, onCompile);
}

/**
 * Dictates what port webpack-dev-server should listen on.
 *
 * @param {Object} config - a webpack config object
 */
const getListenPort = config =>
  process.env.ISLE_DEV_PORT
    ? parseInt(process.env.ISLE_DEV_PORT)
    : config.devServer.port || defaultPort;

/**
 * Starts a webpack DevServer on `listenPort`.
 *
 * @param {Object} config - a webpack config object
 */
export function runDevServer(config) {
  const compiler = createCompiler(config);

  // Tap Isle's logger
  // The "done" event is fired when webpack is done recompiling the bundle.
  compiler.hooks.done.tap('done', stats => onCompile(null, stats));

  // devServer options are passed through all plugins
  const server = new WebpackDevServer(compiler, config.devServer);
  const listenPort = getListenPort(config);

  server.listen(listenPort, 'localhost', err => {
    if (err) {
      logger.fatal(err);
    }

    logger.info(`Listening on http://localhost:${listenPort}/`);
  });
}
