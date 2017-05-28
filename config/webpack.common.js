const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
//const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');

exports.config = ({ entry, buildPath }) => ({
  entry: {
    app: entry,
  },
  output: {
    path: buildPath,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      //excludeChunks: ['vendor'],
    }),
    // new InlineChunkWebpackPlugin({
    //   inlineChunks: ['manifest'],
    // }),
    new FriendlyErrorsWebpackPlugin(),
  ],

});
