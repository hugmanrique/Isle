import TerserPlugin from 'terser-webpack-plugin';

/**
 * Creates a `TerserPlugin` instance for use in production mode.
 *
 * @param {Object} config - base settings
 * @param {Boolean} config.isProduction - whether Lyra is running in production mode
 * @returns {Object} a `TerserPlugin` instance, or null if `isProduction` is `false`.
 * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin}
 */
function createTerserPluginInstance({ isProduction }) {
  if (!isProduction) {
    return null;
  }

  return new TerserPlugin({
    terserOptions: {
      parse: {
        ecma: 8
      },
      compress: {
        ecma: 5,
        warnings: false,
        // There's an issue with Uglify breaking seemingly valid code:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
        // Disabled because of an issue with Terser breaking valid code:
        // https://github.com/terser-js/terser/issues/120
        inline: 2
      },
      mangle: {
        safari10: true
      },
      output: {
        ecma: 5,
        comments: false,
        // Emoji and regex are not minified properly using default
        // https://github.com/facebook/create-react-app/issues/2488
        ascii_only: true
      }
    },
    parallel: true,
    cache: true,
    sourceMap: true
  });
}

/**
 * Generates an `optimization` webpack configuration section
 * according to current settings such as the environment.
 *
 * @param {Object} config - optimization settings
 * @param {Boolean} config.isProduction - whether Lyra is running in production mode
 * @returns {Object} a webpack `optimization` config section object
 * @see {@link https://webpack.js.org/configuration/optimization/}
 */
export default function createOptimizationConfig({ isProduction }) {
  return {
    minimize: isProduction,
    minimizer: [
      // Mangle and compress code in production mode
      createTerserPluginInstance({ isProduction })
    ].filter(Boolean),
    // Automatically split vendor and commons
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: false
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true
  };
}
