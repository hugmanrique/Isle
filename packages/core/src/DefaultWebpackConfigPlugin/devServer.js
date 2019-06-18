/**
 * Creates a `devServer` webpack config section in development
 * mode, returns an empty object otherwise.
 *
 * @param {Object} config - devServer settings
 * @param {Boolean} config.isProduction - whether Isle is running in production mode
 * @param {String} config.contentBase - path to serve static resources from
 * @param {String} config.publicPath - determines where bundles should be served from.
 * @returns {Object} a `devServer` webpack config section
 * @see {@link https://webpack.js.org/configuration/dev-server/}
 */
export default function createDevServerConfig({
  isProduction,
  contentBase,
  publicPath
}) {
  if (isProduction) {
    return {};
  }

  return {
    contentBase,
    // File updates from `contentBase` will trigger a page reload.
    watchContentBase: true,
    // Fallback to serve the `index.html` page in place of 404 responses.
    historyApiFallback: true,
    // Enable hot reloading server. Currently only changes to CSS are hot
    // reloaded. JS changes will refresh the browser.
    hot: true,
    publicPath
  };
}
