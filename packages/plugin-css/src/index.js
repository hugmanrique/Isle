import { Plugin } from '@isle/core';
import addStyleConfig from './styleConfig';

/**
 * Add CSS support to Isle
 */
export class CssPlugin extends Plugin {
  constructor(options = {}) {
    super();

    this.options = options;
  }

  setupWebpack({ config, mode }) {
    addStyleConfig({
      config,
      mode,
      ruleRegex: /\.css$/,
      options: this.options
    });

    return config;
  }
}
