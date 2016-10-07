'use strict';

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: './src/js/app.js',
  output: {
    path: './dist/js',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js'],
  },
  stats: {
    children: false,
  },
  module: {
    preLoaders: [
      {
        test: /.vue$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
    // but use vue-loader for all *.vue files
    loaders: [
      {
        test: /.vue$/,
        loader: 'vue',
      },
      {
        test: /.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/,
      },
    ],
  },
  vue: {
    loaders: {
      js: 'babel',
      scss: ExtractTextPlugin.extract('css!sass'),
    },
    postcss: [autoprefixer()],
  },
  plugins: [
    new ExtractTextPlugin('../css/app.css'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));
} else {
  config.devtool = '#source-map';
}

module.exports = config;
