var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config')();
const DashboardPlugin = require('webpack-dashboard/plugin');

// Add nodemon --watch webpack.config.js --exec to npm start

var app = express();
var compiler = webpack(webpackConfig);

compiler.apply(new DashboardPlugin({ port: process.env.PORT }));

app.use(webpackDevMiddleware(compiler, {
  historyApiFallback: true,
  stats: 'errors-only',
  host: process.env.HOST,
  port: process.env.PORT,
  quiet: true,
  overlay: {
    errors: true,
    warnings: true,
  },
  publicPath: '/', // Same as `output.publicPath` in most cases.
}));

app.listen(process.env.PORT, function () {
  console.log(`Listening on port ${process.env.PORT}!`);
});
