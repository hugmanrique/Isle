/**
 * Creates a `devServer` webpack config section in development
 * mode, returns `null` otherwise.
 *
 * @param {Object} config - devServer settings
 * @param {Boolean} config.isProduction - whether Lyra is running in production mode
 * @param {String} config.publicPath - determines where bundles should be served from.
 * @param {String} config.contentBase - path to serve static resources from
 * @returns {Object} a `devServer` webpack config section
 * @see {@link https://webpack.js.org/configuration/dev-server/}
 */
export default function createDevServerConfig({ isProduction, publicPath }) {
  return;
}

/**
 * Creates an array of webpack `module.rules` according
 * to the current settings such as the environment.
 *
 * @param {Object} config - rules settings
 * @param {Boolean} config.isProduction - whether Lyra is running in production mode
 * @returns {Object[]} an array of webpack module rules
 */
function createModuleRules({ isProduction }) {
  return [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        'thread-loader',
        {
          loader: 'babel-loader',
          options: {
            presets: ['@lyra/babel-preset'],
            cacheDirectory: true,
            cacheCompression: isProduction
          }
        }
      ]
    }
  ];
}
