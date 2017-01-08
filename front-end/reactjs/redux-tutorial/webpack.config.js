'use strict';

const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    port: 7777,
    historyApiFallback: true,
    compress: false,
  },
  plugins: [
    new ManifestPlugin({
      basePath: __dirname,
      fileName: 'push.json',
    })
  ],
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
    }],
  },
  resolve: {
    extension: ['', '.js', '.jsx'],
  },
};
