import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import logger from '@isle/logger';

const listenPort = 4444;

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

  const message = stats.toString();

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
 * Starts a webpack DevServer on `listenPort`.
 *
 * @param {Object} config - a webpack config object
 */
export function runDevServer(config) {
  const compiler = createCompiler(config);
  const server = new WebpackDevServer(compiler, {});

  server.listen(listenPort, 'localhost', err => {
    if (err) {
      logger.fatal(err);
    }

    logger.info(`Listening on port ${listenPort}`);
  });
}
