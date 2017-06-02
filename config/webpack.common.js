const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  ],

});
