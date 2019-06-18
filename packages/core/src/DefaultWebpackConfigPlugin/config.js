import fs from 'fs';

/**
 * Attempts to lookup and require the app's webpack config
 * from `paths.webpackConfig`. Returns `undefined` if the file
 * cannot be found.
 *
 * @param {Object} opts
 * @param {IslePaths} opts.paths - Isle app paths
 * @returns the user overrided webpack config, if found
 */
export default function getUserWebpackConfig({ paths }) {
  const configPath = paths.webpackConfig;

  if (fs.existsSync(configPath)) {
    // The user overrided Isle's default config,
    // parse and return theirs instead.
    return require(configPath);
  }
}
