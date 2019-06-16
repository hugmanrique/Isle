import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import logger from '@isle/logger';
import { copyFromTemplate } from './templateHelper';

// Ensure symlinks are resolved
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Resolves a path relative to the app main directory.
 *
 * @param {String} relativePath - the relative app path
 * @returns {String} an absolute path
 */
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// Main app paths
const paths = {
  // TODO Make these paths configurable
  appBuild: resolveApp('dist'),
  appStatic: resolveApp('static'),
  appEntry: resolveApp('src/index.js'),
  appHtmlTemplate: resolveApp('src/template.html'),
  webpackConfig: resolveApp('webpack.config.js'),
  publicPath: '/'
};

export default paths;

/**
 * Checks if `dirPath` exists and is a directory.
 *
 * @param {String} dirPath - the path to check
 * @param {Boolean} createIfNot - whether to create the dir if not found
 * @return whether `dirPath` exists and is a directory.
 */
function checkDirectoryExists(dirPath, createIfNot) {
  if (!fs.existsSync(dirPath)) {
    if (createIfNot) {
      mkdirp.sync(dirPath);
      return true;
    }

    logger.error(`Isle could not find the ${dirPath} directory`);
    return false;
  }

  if (!fs.lstatSync(dirPath).isDirectory()) {
    logger.error(
      `The ${dirPath} path is not a directory. Perhaps you created a file instead?`
    );
    return false;
  }

  return true;
}

/**
 * Checks if `filePath` exists. If it does not and `loadFromTemplate`
 * is `true`, we attempt to resolve `@isle/template/src/${filePath}`
 * and copy the file to `filePath`.
 *
 * @param {String} filePath - the path to check
 * @param {Boolean} copyIfMissing - whether to copy the file from Isle's template
 */
function checkFileExists(filePath, copyIfMissing) {
  if (!fs.existsSync(filePath)) {
    if (copyIfMissing) {
      const relativePath = path.relative(filePath, appDirectory);

      copyFromTemplate(relativePath, filePath);
      return true;
    }

    logger.error(`Isle could not find the ${filePath} file`);
    return false;
  }

  if (!fs.lstatSync(filePath).isFile()) {
    logger.error(
      `The ${filePath} path is not a file. Perhaps you created a directory instead?`
    );
    return false;
  }

  return true;
}

/**
 * Verifies that essential app directories and files exist
 * (and creates them when possible).
 *
 * If some directory or file is not present and cannot be
 * created this function will call `process.exit`.
 */
export function validate() {
  const exit = [
    checkDirectoryExists(paths.appStatic, true),
    checkFileExists(paths.appEntry, true),
    checkFileExists(paths.appHtmlTemplate, true)
  ].some(result => !result);

  if (exit) {
    process.exit(1);
  }
}
