'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    `${__dirname}/app/index.js`
  ],
  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].js',
    publicPath: '/'
  },

  // ESLint options
  eslint: {
    configFile: '.eslintrc',
    failOnWarning: false,
    failOnError: false
  },

  module: {
    // Runs before loaders
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style!css!postcss!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      },
      { test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file' }
    ]
  },
  plugins: [
    // see webpack.production for wht these plugins do
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': true,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new DashboardPlugin({
      port: 3010,
      handler: dashboard.setData
    })
  ],
};
