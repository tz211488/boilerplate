const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./site.config');

// Define common loader constants
const sourceMap = config.env !== 'production';

// HTML loaders
const html = {
  test: /\.(html)$/,
  use: [
    {
      loader: 'html-loader',
      options: {
        interpolate: true,
      },
    },
  ],
};

// Javascript loaders
const js = {
  test: /\.js(x)?$/,
  exclude: /node_modules|materialize/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
    'eslint-loader',
  ],
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap,
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer')(),
    ],
    sourceMap,
  },
};

const css = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
  ],
};

const sass = {
  test: /\.s[c|a]ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
    {
      loader: 'sass-loader',
      options: {
        sourceMap,
      },
    },
  ],
};

const less = {
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
    {
      loader: 'less-loader',
      options: {
        sourceMap,
      },
    },
  ],
};

// Image loaders
const imageLoader = {
  loader: 'image-webpack-loader',
  options: {
    bypassOnDebug: true,
    gifsicle: {
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    pngquant: {
      quality: '65-90',
      speed: 4,
    },
    mozjpeg: {
      progressive: true,
    },
  },
};

const images = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  exclude: /fonts/,
  use: [
    'file-loader?name=images/[name].[ext]',
    imageLoader,
  ].filter(Boolean),
};

// Font loaders
const fonts = {
  test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
  exclude: /images/,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
      },
    },
  ],
};

// Video loaders
const videos = {
  test: /\.(mp4|webm)$/,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: '[name].[ext]',
        outputPath: 'images/',
      },
    },
  ],
};

module.exports = [
  html,
  js,
  css,
  sass,
  less,
  images,
  fonts,
  videos,
];
