import { Plugin } from '@isle/core';
import { addStyleConfig } from '@isle/plugin-css';

/**
 * Adds SASS file support to Isle
 */
export class SassPlugin extends Plugin {
  constructor(options = {}) {
    super();

    this.options = options;
  }

  setupWebpack({ config, mode }) {
    const isProduction = mode === 'production';

    const rule = addStyleConfig({
      config,
      mode,
      ruleRegex: /\.s[ca]ss$/,
      options: this.options
    });

    const sassLoaderOptions = {
      sourceMap: !isProduction,
      ...(this.options.sassLoaderOptions || {})
    };

    rule.use.push({
      loader: 'sass-loader',
      options: sassLoaderOptions
    });

    return config;
  }
}