import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

function getStyleLoader(extract, loaderOptions) {
  return {
    loader: extract ? MiniCssExtractPlugin.loader : 'style-loader',
    options: loaderOptions
  };
}

const createExtractPlugin = isProduction =>
  new MiniCssExtractPlugin({
    filename: isProduction ? '[name].[chunkhash:8].css' : '[name].css',
    chunkFilename: isProduction
      ? '[name].[chunkhash:8].chunk.css'
      : '[name].chunk.css'
  });

/**
 * Adds a webpack rule to the passed `config`,
 * according to all the passed params.
 *
 * @param {Object} opts
 * @param {Object} opts.config - a webpack config object
 * @param {String} opts.mode - webpack mode (`production` or `development`)
 * @param {RegExp} opts.ruleRegex - rule test regex
 * @param {Object} opts.options - plugin options
 * @returns {Object} the added rule (changes by caller will be reflected on the passed config)
 * @see {@link https://webpack.js.org/configuration/module/#rule}
 */
export default function addStyleConfig({
  config,
  mode,
  ruleRegex,
  options: userOptions
}) {
  const isProduction = mode === 'production';

  const options = {
    extract: isProduction,
    modules: false,
    styleLoaderOptions: {
      hmr: !isProduction,
      sourceMap: !isProduction
    },
    cssLoaderOptions: {
      importLoaders: 1,
      sourceMap: !isProduction
    },
    ...userOptions
  };

  const rule = {
    test: ruleRegex,
    use: [
      getStyleLoader(options.extract, options.styleLoaderOptions),
      {
        loader: 'css-loader',
        options: options.cssLoaderOptions
      }
    ]
  };

  config.module.rules.push(rule);

  if (options.extract) {
    // Add extract plugin
    const plugin = createExtractPlugin(isProduction);

    config.plugins.push(plugin);
  }

  if (isProduction) {
    // Optimize CSS with cssnano
    config.optimization.minimizer.push(
      new OptimizeCssAssetsPlugin({
        // We inject our own logger
        canPrint: false
      })
    );
  }

  return rule;
}
