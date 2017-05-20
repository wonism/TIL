'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, process.env.ENTRY, 'index.js'),
  devServer: {
    contentBase: path.join(__dirname, process.env.ENTRY),
    inline: true,
    port: 7777,
    historyApiFallback: true,
    compress: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('development'),
      }
    })
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'eslint-loader',
    },
    {
      loader: 'babel-loader',
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-2']
      },
    },
    {
      use: ['style-loader', 'css-loader', 'sass-loader?sourceMap=true'],
      test: /\.s?css$/,
      exclude: /(node_modules|bower_components)/,
    }],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.join(__dirname, process.env.ENTRY),
    filename: 'bundle.js',
  },
};

