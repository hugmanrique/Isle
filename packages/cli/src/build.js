import logger from '@isle/logger';
import { startBuild as startWebpackCompilation } from './webpack';
import startPrerender from './prerender';

/**
 * Builds the Isle app.
 */
export default async function startBuild() {
  logger.info('Starting webpack compilation...');

  const config = await startWebpackCompilation();

  const prerenderSource = config.output.path;

  if (!prerenderSource) {
    logger.warn(
      "Isle couldn't find webpack's output path in your config. Skipping prerendering."
    );

    return;
  }

  logger.info('Pre-rendering routes...');

  startPrerender({ source: prerenderSource });
}
