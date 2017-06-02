const path = require('path');
const merge = require('webpack-merge');

const parts = require('./config/webpack.parts');
const common = require('./config/webpack.common');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  common.config({
    entry: PATHS.app,
    buildPath: PATHS.build,
  }),
]);

// Highest quality source map - GET RID OF WHEN ACTUALLY DEVELOPING
const productionConfig = merge([
  {
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.NamedChunksPlugin((chunk) => {
        if (chunk.name) {
          return chunk.name;
        }
        return chunk.modules.map(m => path.relative(m.context, m.request)).join('_');
      }),
    ],
  },
  parts.nameAllModules(),
  parts.clean({
    root: __dirname,
    path: 'build',
  }),
  parts.extractBundles([
    {
      name: 'vendor',
      chunks: ['app'],
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      name: 'manifest',
      chunks: ['vendor'],
      minChunks: Infinity,
    },
  ]),
  parts.loadJavaScript({
    include: PATHS.app,
  }),
]);

module.exports = (env) => {
  return merge([commonConfig, productionConfig]);
};
