import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import logger from '@lyra/logger';

import paths, { validate as validatePaths } from './paths';
import createOptimizationConfig from './optimization';
import createModuleRules from './rules';
import createDevServerConfig from './devServer';

const fallbackMode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default function LyraConfig({ mode = fallbackMode } = {}) {
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
