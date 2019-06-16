import fs from 'fs';
import paths from './paths';

import IsleConfig from './index';

const appConfigPath = paths.webpackConfig;

export default function getWebpackConfig() {
  // The user overrided Isle's default config,
  // parse and return theirs instead.
  if (fs.existsSync(appConfigPath)) {
    return require(appConfigPath);
  }

  // Fallback to default config
  return IsleConfig();
}
