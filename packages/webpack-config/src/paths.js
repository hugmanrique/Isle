import fs from 'fs';
import path from 'path';

// Ensure symlinks are resolved
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Resolves a path relative to the app main directory.
 *
 * @param {String} relativePath - the relative app path
 * @returns {String} an absolute path
 */
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export default {
  // TODO Make these paths configurable
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appEntry: resolveApp('src/index.js'),
  appHtmlTemplate: resolveApp('src/template.html'),
  publicPath: '/'
};
