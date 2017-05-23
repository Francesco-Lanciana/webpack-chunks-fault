require('dotenv').config();
const path = require('path');
const merge = require('webpack-merge');
const glob = require('glob');

const parts = require('./config/webpack.parts');
const common = require('./config/webpack.common');

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
]);

const developmentConfig = merge([
  commonConfig,
  parts.loadStyleSheets({ exlude: /node_modules/ }),
]);

module.exports = (env) => {
  if (env === 'production') {
    return productionConfig;
  }
  return developmentConfig;
};
