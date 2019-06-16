import path from 'path';
import logger from '@lyra/logger';

function loadTemplateDir() {
  try {
    return require.resolve('@lyra/template');
  } catch (err) {
    logger.error(
      `Lyra could not find the @lyra/template module. Try installing it with "npm i --save-dev @lyra/template"`
    );
  }
}

const templateDir = loadTemplateDir();

/**
 * Resolves the given non-absolute (i.e. relative) path from Lyra's
 * `@lyra/template` module.
 *
 * @param {String} filePath - the module path to resolve
 * @returns {String} the resolved filename.
 */
function resolveFromTemplate(filePath) {
  // For security reasons, we don't allow parent directory traversal.
  const safeResolvePath = filePath.replace(/\.\./g, '');

  return path.resolve(templateDir, safeResolvePath);
}
