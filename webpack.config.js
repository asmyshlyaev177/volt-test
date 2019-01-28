'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/app.jsx')
  ],
  resolve: {
    root: [
      path.resolve(__dirname, "src"),
    ],
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    path: path.join(__dirname, '/public/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: [
          'react',
          'stage-0',
          'es2015',
        ],
        plugins: [
          ['react-transform', {
            'transforms': [{
              'transform': 'react-transform-hmr',
              'imports': ['react'],
              'locals': ['module']
            }]
          }],
          ['transform-class-properties'],
          ['transform-runtime'],
          ['transform-decorators-legacy']
        ]
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
};
