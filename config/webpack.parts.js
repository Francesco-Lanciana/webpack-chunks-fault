const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

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
    filename: '[name].[contenthash:8].css',
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


exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
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

exports.minifyJavaScript = () => ({
  plugins: [
    new BabiliPlugin(),
  ],
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

exports.nameAllModules = () => ({
  plugins: [{
    apply(compiler) {
      compiler.plugin('compilation', (compilation) => {
        compilation.plugin('before-module-ids', (modules) => {
          modules.forEach((module) => {
            console.log(module.id);
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
