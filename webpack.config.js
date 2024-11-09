const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => ({
  mode: 'none',
  entry: './src/index.js',  // Entry point
  output: {
    // Specify the output directory
    path: path.resolve(__dirname, 'dist'),
    // Bundle everything into a single file
    filename: 'nvl-bundle.js',
    clean: true,  // Clean output folder before each build
  },
  module: {
    rules: [{
      test: /\.js/,
      exclude: /node_modules|dist/,
      use: 'babel-loader',
    }],
  },
  optimization: {
    splitChunks: false,  // Disable code splitting entirely
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
});
