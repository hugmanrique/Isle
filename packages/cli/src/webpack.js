import webpack from 'webpack';
import { __internalGetWebpackConfig } from '@isle/webpack-config';
import logger from '@isle/logger';

/**
 * Creates a webpack `Compiler` instance with Isle's config
 * grabbed from `@isle/webpack-config`.
 *
 * @returns {Object} a webpack `Compiler` instance
 */
function createCompiler() {
  const config = __internalGetWebpackConfig();

  return webpack(config);
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
 */
export function startBuild() {
  const compiler = createCompiler();

  compiler.run(onCompile);
}

/**
 * Starts a webpack watching session.
 */
export function startWatching() {
  const compiler = createCompiler();

  compiler.watch({}, onCompile);
}
