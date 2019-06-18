import { run as prerender } from 'react-snap';

/**
 * @typedef {import('./paths').IslePaths} IslePaths
 */

const defaultConfig = {
  puppeteerArgs: ['--no-sandbox']
};

/**
 * Start react-snap prerender session with the passed config.
 *
 * @param {Object} obj
 * @param {Object} obj.config - a react-snap config object
 * @param {IslePaths} obj.paths - Isle app paths
 * @see {@link https://github.com/stereobooster/react-snap/}
 */
export default function runPrerender({ config: userConfig = {}, paths = {} }) {
  const config = Object.assign(defaultConfig, userConfig);

  if (!config.source) {
    // Default to prerendering webpack's output
    config.source = paths.appBuild;
  }

  prerender(config);
}
