import MagicString from 'magic-string';

import defaultConfig from '../../default.rollup.config';
import pkg from './package.json';

const config = defaultConfig(pkg);

// Fixed version of https://github.com/developit/rollup-plugin-preserve-shebang
const shebang = '#!/usr/bin/env node';

config.plugins.push({
  name: 'shebang',
  renderChunk(code, chunk, { sourcemap }) {
    const str = new MagicString(code);

    str.prepend(`${shebang}\n`);

    return {
      code: str.toString(),
      map: sourcemap ? str.generateMap({ hires: true }) : undefined
    };
  }
});

export default config;
