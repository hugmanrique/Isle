import webpack from 'webpack';
import { __internalGetWebpackConfig } from '@isle/webpack-config';
import logger from '@isle/logger';

function createCompiler() {
  const config = __internalGetWebpackConfig();

  return webpack(config);
}

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

export function startBuild() {
  const compiler = createCompiler();

  compiler.run(onCompile);
}

export function startWatching() {
  const compiler = createCompiler();

  compiler.watch({}, onCompile);
}
