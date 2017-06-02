const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Rules that can be applied in production and development
const styleLoaders = () => ([
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => ([
        require('postcss-cssnext')(),
      ]),
      sourceMap: true,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  }
]);

// Loaders and corresponding options applied to files in production
exports.extractStyleSheets = ({ include, exclude } = {}) => {

  const plugin = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: plugin.extract({
            use: styleLoaders(),
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

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
