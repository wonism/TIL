'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: __dirname,
    inline: true,
    port: 8888,
    historyApiFallback: true,
    compress: false,
  },
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react']
      }
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
};

