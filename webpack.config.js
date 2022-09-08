const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './app/src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/dist'),
    clean: true
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCSSExtractPlugin.loader, 'css-loader'] }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CSSMinimizerWebpackPlugin(),
      '...'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/src/index.html',
      hash: true
    }),
    new MiniCSSExtractPlugin({
      filename: 'style.css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), 
    port: 3000
  }
};