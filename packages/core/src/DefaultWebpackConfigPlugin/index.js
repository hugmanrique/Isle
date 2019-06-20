import Plugin from '../Plugin';
import logger from '@isle/logger';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import merge from 'webpack-merge';

import createOptimizationConfig from './optimization';
import createModuleRules from './rules';
import createDevServerConfig from './devServer';
import getUserWebpackConfig from './config';

/**
 * Returns Isle's default webpack config. Depending on
 * the passed `mode` and `plugins`, Isle applies different
 * optimizations and plugins.
 */
export default class DefaultWebpackPlugin extends Plugin {
  setupWebpack({ mode, paths }) {
    const isProduction = mode === 'production';

    const config = {
      mode,
      entry: paths.appEntry,
      output: {
        path: isProduction ? paths.appBuild : undefined,
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
        // Remove all files in output dir before bundling
        new CleanWebpackPlugin(),
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

    if (isProduction) {
      config.plugins.push(
        // Copy static assets
        new CopyWebpackPlugin([
          {
            from: paths.appStatic,
            to: paths.appBuild
          }
        ])
      );
    }

    const userConfig = getUserWebpackConfig({ paths });

    if (userConfig) {
      logger.info(
        `Found webpack config in ${paths.webpackConfig}, merging with defaults...`
      );

      return merge(config, userConfig);
    }

    // Fallback to default config
    return config;
  }
}
