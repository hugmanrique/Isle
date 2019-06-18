/* eslint-disable no-unused-vars */
/**
 * @typedef {import('./paths').IslePaths} IslePaths
 */

/**
 * Represents an Isle plugin
 */
export default class Plugin {
  /**
   * Returns the modified webpack config object respecting
   * the current `mode` and `paths`.
   *
   * @param {Object} obj - setup params
   * @param {Object} obj.config - a webpack config object
   * @param {String} obj.mode - webpack mode (`production` or `development`)
   * @param {IslePaths} obj.paths - Isle app paths
   * @see {@link https://webpack.js.org/configuration/}
   */
  setupWebpack({ config, mode, paths }) {
    return config;
  }

  /**
   * Returns the modified react-snap config object respecting
   * the current `mode` and `paths`.
   *
   * @param {Object} obj - setup params
   * @param {Object} obj.config - a react-snap config object
   * @param {String} obj.mode - webpack mode (`production` or `development`)
   * @param {IslePaths} obj.paths - Isle app paths
   * @see {@link https://github.com/stereobooster/react-snap/}
   */
  setupPrerender({ config, mode, paths }) {
    return config;
  }
}

/**
 * Returns a fully configured webpack config object
 * passed through all plugins in order.
 *
 * @param {Object} obj - setup params
 * @param {String} obj.mode - webpack mode (`production` or `development`)
 * @param {IslePaths} obj.paths - Isle app paths
 * @param {Plugin[]} obj.plugins - an array of Isle plugins
 */
export function setupWebpackConfig({ mode, paths, plugins }) {
  return plugins.reduce(
    (config, plugin) => plugin.setupWebpack({ config, paths, mode }),
    {}
  );
}

/**
 * Returns a fully configured react-snap config object
 * passed through all plugins in order.
 *
 * @param {Object} obj - setup params
 * @param {String} obj.mode - webpack mode (`production` or `development`)
 * @param {IslePaths} obj.paths - Isle app paths
 * @param {Plugin[]} obj.plugins - an array of Isle plugins
 */
export function setupPrerenderConfig({ mode, paths, plugins }) {
  return plugins.reduce(
    (config, plugin) => plugin.setupPrerender({ config, paths, mode }),
    {}
  );
}
