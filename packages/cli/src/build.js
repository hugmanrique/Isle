import logger from '@isle/logger';
import { startBuild as startWebpackCompilation } from './webpack';

/**
 * Builds the Isle app.
 */
export default function startBuild() {
  logger.info('Starting webpack compilation...');

  startWebpackCompilation();

  logger.info('Pre-rendering routes...');

  logger.warn('TODO Implement prerendering');
}
