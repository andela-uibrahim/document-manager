const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './client/src/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './client/src/index.jsx',
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // { 
      //   test: /\.jsx$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/ 
      // },
      { 
        test: /\.css$/,
        loader: ['style-loader','css-loader'] 
      },
      { 
        test: /\.(jpg|png|svg|jpeg)$/,
        loader: 'url-loader' 
      },
      { 
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  target: 'web',
  // resolve: {
  //   extensions: ['.js']
  // },
  output: {
    path: path.resolve('./client/dist'),
    filename: 'bundle.js'
  },
  // devServer: {
  //   contentBase: './client/dist',
  //   hot: true
  // },
  // plugins: [
  //   HtmlWebpackPluginConfig,
  //   new ExtractTextPlugin('stylesheet.css')
  // ]
};
