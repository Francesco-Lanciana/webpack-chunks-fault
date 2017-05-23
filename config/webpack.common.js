const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

exports.config = ({ entry, buildPath }) => ({
  entry: {
    app: entry,
  },
  output: {
    path: buildPath,
    publicPath: 'http://0.0.0.0' + ':' + process.env.PORT,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],

});
