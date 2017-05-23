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

const commonStyleLoaders = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
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
];

const sassLoaders = commonStyleLoaders.concat({
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
});
// postcss-loader and sass-loader should be applied to sass imports
sassLoaders[1].options.importLoaders = 2;

exports.loadStyleSheets = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: commonStyleLoaders,
      },
      {
        test: /\.scss$/,
        use: sassLoaders,
      },
    ],
  },
});
