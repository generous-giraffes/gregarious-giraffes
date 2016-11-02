var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./server/server.js'],
  output: {
    path: __dirname + '/client/dist',
    filename: 'bundle.js'
  },
  debug: true,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};

/*

use 'webpack -w' in Terminal to build the bundle.js file...and keep it running in background

*/