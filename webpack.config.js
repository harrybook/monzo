'use strict';

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
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
  vue: {
    loaders: {
      js: 'babel',
      scss: ExtractTextPlugin.extract('css!sass'),
    },
    autoprefixer: true,
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
