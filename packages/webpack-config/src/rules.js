/**
 * Creates an array of webpack `module.rules` according
 * to the current settings such as the environment.
 *
 * @param {Object} config - rules settings
 * @param {Boolean} config.isProduction - whether Isle is running in production mode
 * @returns {Object[]} an array of webpack module rules
 * @see {@link https://webpack.js.org/configuration/module/#modulerules}
 */
export default function createModuleRules({ isProduction }) {
  return [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        'thread-loader',
        {
          loader: 'babel-loader',
          options: {
            presets: ['@isle/babel-preset'],
            cacheDirectory: true,
            cacheCompression: isProduction
          }
        }
      ]
    }
  ];
}
