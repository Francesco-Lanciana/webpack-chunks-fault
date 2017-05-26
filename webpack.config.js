require('dotenv').config();
const path = require('path');
const merge = require('webpack-merge');
const glob = require('glob');

const parts = require('./config/webpack.parts');
const common = require('./config/webpack.common');

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
  parts.clean({
    root: __dirname,
    path: 'build',
  }),
  parts.extractStyleSheets({ exlude: /node_modules/ }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true}),
  }),
  parts.loadImages({
    options: {
      limit: 500, // After optimization limit
      name: '[name].[ext]',
    },
  }),
  parts.loadFonts(),
  parts.loadJavaScript({
    include: PATHS.app,
    exlude: /(node_modules|bower_components)/,
  }),
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
  ]),
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
  const config = env === 'production' ?
    productionConfig :
    developmentConfig;

  return merge([commonConfig, config]);
};
