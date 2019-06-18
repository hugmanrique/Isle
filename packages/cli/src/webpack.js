import webpack from 'webpack';
import { __internalGetWebpackConfig } from '@isle/webpack-config';
import logger from '@isle/logger';

/**
 * @typedef {Object} Compiler
 * @property {Object} config - Isle's webpack config
 * @property {Object} compiler - a webpack `Compiler` instance
 */

/**
 * Creates a webpack `Compiler` instance with Isle's config
 * grabbed from `@isle/webpack-config`.
 *
 * @returns {Compiler} a compiler and config object
 */
function createCompiler() {
  const config = __internalGetWebpackConfig();

  return {
    config,
    compiler: webpack(config)
  };
}

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
 * @returns {Promise} called when the compilation is done. The resolve callback value is the used webpack config.
 */
export const startBuild = () =>
  new Promise((resolve, reject) => {
    const { compiler, config } = createCompiler();

    compiler.run((err, stats) => {
      // Log compile output
      onCompile(err, stats);

      if (err) {
        return reject(err);
      }

      resolve(config);
    });
  });

/**
 * Starts a webpack watching session.
 *
 * @returns {Object} the used webpack config
 */
export function startWatching() {
  const { compiler, config } = createCompiler();

  compiler.watch({}, onCompile);

  return config;
}
