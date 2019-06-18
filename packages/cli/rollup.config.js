import shebang from 'rollup-plugin-preserve-shebang';

import defaultConfig from '../../default.rollup.config';
import pkg from './package.json';

const config = defaultConfig(pkg);

config.plugins.push(
  // Declare shebang
  shebang({
    shebang: '#!/usr/bin/env node'
  })
);

export default config;
