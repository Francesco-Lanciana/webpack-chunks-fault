var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config')();
//const DashboardPlugin = require('webpack-dashboard/plugin');

// Add nodemon --watch webpack.config.js --exec to npm start

var app = express();
var compiler = webpack(webpackConfig);

//compiler.apply(new DashboardPlugin({ port: process.env.PORT }));

const PORT = process.env.PORT || 8080;

// https redirect (CHANGE LATER)
app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

//TODO ADD PRODUCTION SERVER
// if (process.env === 'production') {
//   // Tell it which folder we want to serve
//   app.use(express.static('public'));
// } else {
//
// }


app.use(webpackDevMiddleware(compiler, {
  stats: 'errors-only',
  //quiet: true,
  publicPath: '/', // Same as `output.publicPath` in most cases.
}));

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});
