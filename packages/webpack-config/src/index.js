import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import logger from '@isle/logger';

import paths, { validate as validatePaths } from './paths';
import createOptimizationConfig from './optimization';
import createModuleRules from './rules';
import createDevServerConfig from './devServer';
import getWebpackConfig from './configRetriever';

const fallbackMode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

/**
 * Returns Isle's webpack config. Depending on the passed `mode`,
 * Isle applies different optimizations and plugins.
 *
 * @param {Object} config - Isle's config
 * @param {String} config.mode - webpack mode (`production` or `development`)
 */
export default function IsleConfig({ mode = fallbackMode } = {}) {
  const isProduction = mode === 'production';

  logger.info(`Running in ${mode} mode`);

  validatePaths();

  return {
    mode,
    entry: paths.appEntry,
    output: {
      path: isProduction ? paths.appBuild : null,
      filename: isProduction ? '[name].[chunkhash:8].js' : '[name].js',
      chunkFilename: isProduction
        ? '[name].[chunkhash:8].chunk.js'
        : '[name].chunk.js',
      publicPath: paths.publicPath
    },
    optimization: createOptimizationConfig({ isProduction }),
    // Produces SourceMaps without comment references in production,
    // and best quality (but big) SourceMaps in development mode.
    // https://webpack.js.org/configuration/devtool/
    devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',
    module: {
      rules: createModuleRules({ isProduction })
    },
    plugins: [
      // rim-raf the output dir before bundling
      new CleanWebpackPlugin([paths.appBuild]),
      new HtmlWebpackPlugin({
        template: paths.appHtmlTemplate
      })
    ],
    devServer: createDevServerConfig({
      isProduction,
      contentBase: paths.appStatic,
      publicPath: paths.publicPath
    })
  };
}

/**
 * Returns a webpack config object. If the app contains a `webpack.config.js`,
 * we require this file and return the default export. Otherwise, we return
 * Isle's default config.
 *
 * @see IsleConfig
 */
export const __internalGetWebpackConfig = () => getWebpackConfig();
