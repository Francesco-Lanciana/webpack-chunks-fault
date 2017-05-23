const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

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
