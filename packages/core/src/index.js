import logger from '@isle/logger';

import { validatePaths } from './paths';
import { setupWebpackConfig, setupPrerenderConfig } from './Plugin';
import {
  runBuild as runWebpackBuild,
  runWatch as runWebpackWatch
} from './webpack';
import runPrerender from './prerender';

/**
 * @typedef {import('./paths').IslePaths} IslePaths
 */

const fallbackMode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

/**
 * Builds (and optionally watches) an Isle app. Depending on the passed
 * `mode` and `plugins`, Isle applies different optimizations and plugins.
 *
 * @param {Object} config - Isle's config
 * @param {String} config.mode - webpack mode (`production` or `development`)
 * @param {Boolean} config.watch - continuous compilation (watch for changes)
 * @param {IslePaths} config.paths - Isle app paths
 * @param {Object[]} config.plugins - an array of Isle plugins
 * @see {Plugin.js} for more info about plugins.
 */
export default async function Isle({
  mode = fallbackMode,
  watch = false,
  paths: userPaths = {},
  plugins = []
} = {}) {
  logger.info(`Running in ${mode} mode (watch=${watch})`);

  const paths = validatePaths(userPaths);

  // TODO unshift Isle's default plugin

  const webpackConfig = setupWebpackConfig({ mode, paths, plugins });

  logger.info('Starting webpack compilation...');

  // Watch mode
  if (watch) {
    runWebpackWatch(webpackConfig);
    return;
  }

  // Build mode

  // 1. Run webpack compilation
  await runWebpackBuild(webpackConfig);

  // 2. Prerender webpack's output
  const prerenderConfig = setupPrerenderConfig({ mode, paths, plugins });

  runPrerender({ config: prerenderConfig, paths });
}

export { default as Plugin } from './Plugin';
