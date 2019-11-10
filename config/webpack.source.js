const path = require('path');

const config = require('./site.config');
const loaders = require('./webpack.source.loaders');
const plugins = require('./webpack.source.plugins');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: path.join(config.root, config.paths.src),
  entry: {
    home: path.join(config.root, config.paths.src, 'javascripts/home.js'),
    // materialize: path.join(config.root, config.paths.src, 'javascripts/materialize.js'),
    // mainStyles: path.join(config.root, config.paths.src, 'stylesheets/styles.scss'),
    venderStyles: path.join(config.root, config.paths.src, 'stylesheets/vender.scss'),
  },
  output: {
    path: path.join(config.root, 'source'),
    filename: '[name].js',
  },
  mode: ['production', 'development'].includes(config.env)
    ? config.env
    : 'development',
  devtool: config.env === 'production'
    ? 'hidden-source-map'
    : 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(config.root, config.paths.src),
    watchContentBase: true,
    hot: true,
    open: true,
    port: config.port,
    host: config.dev_host,
    https: true,
  },
  module: {
    rules: loaders,
  },
  target: 'web',
  plugins,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
            beautify: true,
          },
          minify: (file, sourceMap) => {
            // https://github.com/mishoo/UglifyJS2#minify-options
            const uglifyJsOptions = {
              /* your `uglify-js` package options */
              compress: false,
            };

            if (sourceMap) {
              uglifyJsOptions.sourceMap = {
                content: sourceMap,
              };
            }

            return require('uglify-js').minify(file, uglifyJsOptions);
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /jquery.js|materialize.js/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const moduleFileName = module.identifier().split('/').reduceRight(item => item).replace('.js', '');

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `vender.${moduleFileName}`;
          },
        },
      },
    },
  },
};
