import fs from 'fs';
import logger from '@isle/logger';
import DefaultWebpackConfigPlugin from '@isle/default-webpack-config-plugin';

import { isleConfigPath } from './paths';

/**
 * Performs validation checks on the passed Isle config
 * object from `source`.
 *
 * @param {*} config - Isle's config object
 * @param {*} origin - the origin of this object (used for logging)
 */
function validateConfig(config, origin) {
  if (typeof config !== 'object') {
    logger.error(
      `The config from ${origin} is not an Object (got ${typeof config} instead)`
    );

    process.exit(1);
  }
}

/**
 * Merges the passed config with the app's Isle config
 * in `isleConfigPath`. Fallbacks to sane defaults.
 *
 * @returns an Isle config object
 */
export default function getIsleConfig(baseConfig) {
  validateConfig(baseConfig, 'params');

  let fileConfig = {};

  if (fs.existsSync(isleConfigPath)) {
    fileConfig = require(isleConfigPath);

    validateConfig(fileConfig, isleConfigPath);
  }

  // Merge all (validated) configs together
  const config = Object.assign({}, fileConfig, baseConfig);

  // Insert default webpack config plugin
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.unshift(new DefaultWebpackConfigPlugin());

  return config;
}
