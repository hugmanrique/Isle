import banner from 'rollup-plugin-banner';

import defaultConfig from '../../default.rollup.config';
import pkg from './package.json';

const config = defaultConfig(pkg);

// Workaround until https://github.com/yingye/rollup-plugin-banner/issues/1 gets fixed
config.output.sourcemap = false;

config.plugins.push(
  // Declare shebang
  banner('#/usr/bin/env node')
);

export default config;
