var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    // 'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    root: [process.cwd()+'/src', process.cwd+'/node_modules'],
    alias: {
      semantic: "./semantic/dist/semantic.min.js",
      semantic_css: "./semantic/dist/semantic.min.css",
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/img' },
      { from: 'src/semantic/dist/semantic.min.css' },
      { from: 'src/semantic/dist/themes', to: 'themes' },
    ])
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname,
    },
    {
      test: /\.json/,
      loaders: ['json'],
      exculde: /node_modules/,
      include: __dirname,
    },
    ],
  },
}
