const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.lintJavascript = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

// Rules that can be applied in production and development
const commonStyleLoaders = ( {sourceMap} = false ) => ([
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      sourceMap,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => ([
        require('postcss-cssnext')(),
      ]),
      sourceMap,
    },
  },
]);

// Adds style-loader to loaders when in dev mode
const devStyleLoaders = ( {sourceMap} = false ) => (
  ['style-loader'].concat(commonStyleLoaders(sourceMap))
);

// Sass-loader and corresponding options
const sassLoaders = commonStyleLoaders({ sourceMap: true }).concat({
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
});
// postcss-loader and sass-loader should be applied to sass imports
sassLoaders[1].options.importLoaders = 2;


// Loaders and corresponding options applied to files in production
exports.extractStyleSheets = ({ include, exclude } = {}) => {

  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: plugin.extract({
            use: commonStyleLoaders(),
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.scss$/,
          use: plugin.extract({
            use: sassLoaders,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

sassLoaders.unshift('style-loader');

// Loaders and corresponding options applied to files in development,
// as style sheets are only extracted in production.
exports.loadStyleSheets = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: devStyleLoaders({ sourceMap: true }),
      },
      {
        test: /\.scss$/,
        use: sassLoaders,
      },
    ],
  },
});

// Plugin to remove unused css from build
exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths }),
  ],
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        include,
        exclude,

        use: [
          {
            loader: 'url-loader',
            options,
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '35-60',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
});


exports.loadFonts = () => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
          publicPath: '../',
        },
      },
      {
        // Match woff2 in addition to patterns like .woff?v=1.1.1.
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          mimetype: 'application/font-woff',

          // Output below the fonts directory
          name: './fonts/[name].[ext]',

          // Tweak publicPath to fix CSS lookups to take
          // the directory into account.
          publicPath: '../',
        },
      },
    ],
  },
});

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

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
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
