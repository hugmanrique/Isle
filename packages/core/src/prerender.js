import path from 'path';
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

    // react-snap doesn't support absolute source paths
    // https://github.com/stereobooster/react-snap/blob/master/index.js#L656
    const relativePath = path.relative(paths.appRoot, paths.appBuild);

    config.source = relativePath;
  }

  prerender(config);
}
