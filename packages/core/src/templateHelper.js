import fs from 'fs';
import path from 'path';
import logger from '@isle/logger';

function loadTemplateDir() {
  try {
    const packageJsonPath = require.resolve('@isle/template/package.json');
    const moduleRoot = path.dirname(packageJsonPath);

    // Template files are stored inside `src/`
    return path.join(moduleRoot, 'src');
  } catch (err) {
    logger.fatal(
      `Isle could not find the @isle/template module. Try installing it with "npm i --save-dev @isle/template"`
    );
  }
}

const templateDir = loadTemplateDir();

/**
 * Resolves the given non-absolute (i.e. relative) path from Isle's
 * `@isle/template` module.
 *
 * @param {String} filePath - the module path to resolve
 * @returns {String} the resolved filename.
 */
function resolveFromTemplate(filePath) {
  // For security reasons, we don't allow parent directory traversal.
  const safeResolvePath = filePath.replace(/\.\./g, '');

  return path.resolve(templateDir, safeResolvePath);
}

/**
 * Copies the template file from `resolveFromTemplate` to `destination`.
 * Will throw if the copy operation fails.
 *
 * @param {String} filePath - the template module path to resolve
 * @param {String} destination - the path where the template file should be copied to
 */
export function copyFromTemplate(filePath, destination) {
  const templatePath = resolveFromTemplate(filePath);

  try {
    fs.copyFileSync(templatePath, destination);
  } catch (err) {
    logger.error(
      `Isle could not copy the ${filePath} template file to ${destination}`
    );

    throw err;
  }
}
