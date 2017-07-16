'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    basic: './src/basic.js',
    http: './src/http.js',
    counter: './src/counter.js',
    'bmi-app': './src/bmi-app.js',
    'bmi-mvi-app': './src/bmi-mvi-app.js',
    'modular-bmi-mvi-app': './src/modular-bmi-mvi-app.js',
    'component-basic': './src/component-basic.js',
    'component-isolated': './src/component-isolated.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    port: 7777,
    historyApiFallback: true,
    compress: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('development')
      }
    })
  ],
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
    }],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name]-bundle.js',
  },
};
