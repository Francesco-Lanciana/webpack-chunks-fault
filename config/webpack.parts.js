const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,

        loader: 'babel-loader',
        options: {
          // Enable caching for improved performance during
          // development.
          // It uses default OS directory by default. If you need
          // something more custom, pass a path to it.
          // I.e., { cacheDirectory: '<path>' }
          cacheDirectory: true,
        },
      },
    ],
  },
});

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});

exports.clean = ({root, path}) => ({
  plugins: [
    new CleanWebpackPlugin([path], {
      root,
    }),
  ],
});

exports.nameAllModules = () => ({
  plugins: [{
    apply(compiler) {
      compiler.plugin('compilation', (compilation) => {
        compilation.plugin('before-module-ids', (modules) => {
          modules.forEach((module) => {
            if (module.id !== null) {
              return;
            }
            module.id = module.identifier();
          });
        });
      });
    },
  }],
});
