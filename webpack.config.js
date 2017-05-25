require('dotenv').config();
const path = require('path');
const merge = require('webpack-merge');
const glob = require('glob');

const parts = require('./config/webpack.parts');
const common = require('./config/webpack.common');
var webpack = require('webpack');

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

const productionConfig = merge([
  commonConfig,
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
]);

const developmentConfig = merge([
  commonConfig,
  parts.loadStyleSheets({ exlude: /node_modules/ }),
  parts.loadImages(),
]);

module.exports = (env) => {
  if (env === 'production') {
    return productionConfig;
  }
  return developmentConfig;
};
