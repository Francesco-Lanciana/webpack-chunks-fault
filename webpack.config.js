require('dotenv').config();
const path = require('path');
const merge = require('webpack-merge');
const glob = require('glob');

const parts = require('./config/webpack.parts');
const common = require('./config/webpack.common');
const webpack = require('webpack');

// const DEVELOPMENT = process.env.NODE_ENV === 'development';
// const PRODUCTION = process.env.NODE_ENV === 'production';

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  common.config({
    entry: PATHS.app,
    buildPath: PATHS.build,
  }),
  parts.lintJavascript({
    include: PATHS.app,
    options: {
      emitWarning: true,
    },
  }),
]);

// Highest quality source map - GET RID OF WHEN ACTUALLY DEVELOPING
const productionConfig = merge([
  {
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
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
    //recordsPath: path.join(__dirname, 'records.json'),
  },
  parts.nameAllModules(),
  parts.clean({
    root: __dirname,
    path: 'build',
  }),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true,
    },
  }),
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => {
        console.log('SHSHS');
        console.log(resource);
        return resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/);
      },
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
  parts.extractStyleSheets({ exclude: /node_modules/ }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true}),
  }),
  parts.loadImages({
    options: {
      limit: 500, // After optimization limit
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.loadFonts({
    options: {
      name: './fonts/[name].[hash:8].[ext]',
      publicPath: '../',
    },
  }),
  parts.loadJavaScript({
    include: PATHS.app,
    //exlude: /(node_modules|bower_components)/,
  }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
  //parts.generateSourceMaps({ type: 'source-map' }),
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-module-source-map' }),
  parts.loadStyleSheets({ exlude: /node_modules/ }),
  parts.loadImages(),
  parts.loadFonts(),
]);

// {
//   output: {
//     devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
//   },
// },
// parts.generateSourceMaps({ type: 'cheap-module-source-map' }),

module.exports = (env) => {
  console.log(env);
  const config = env === 'production' ?
    productionConfig :
    developmentConfig;

  return merge([commonConfig, config]);
};
