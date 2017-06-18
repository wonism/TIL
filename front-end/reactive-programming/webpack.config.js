module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    port: 7777,
    hot: true,
    inline: true,
  },
  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
};
