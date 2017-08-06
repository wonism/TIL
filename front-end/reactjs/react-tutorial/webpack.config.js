const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  filename: 'assets/stylesheets/bundle-[name].css',
});
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    'tutorial-app': path.resolve('./src/index.jsx'),
  },
  devServer: {
    contentBase: path.resolve('./public'),
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: 7777,
    historyApiFallback: true,
  },
  output: {
    filename: 'assets/javascripts/bundle-[name].js',
    path: path.resolve('./public'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.resolve('./src'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      },
    }),
    extractSass,
  ],
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: path.resolve('./src'),
        options: {
          failOnWarning: true,
          failOnError: true,
          emitWarning: true,
        },
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules|bower_components/,
      },
      {
        test: /\.scss$|\.sass$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: true,
              includePaths: [path.resolve('./node_modules')],
            },
          }, {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve('./node_modules')],
            },
          }],
        })
      }
    ],
  },
};

if (!isProduction) {
  config.devtool = 'eval-source-map';
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  config.externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
  };
}

module.exports = config;
