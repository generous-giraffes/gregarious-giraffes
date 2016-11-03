var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, "client/public"),
    filename: 'bundle.js'
  },
  debug: true,

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-1', 'react']
      }
    }]
  }
};

/*

make sure webpack is installed globally to use webpack commands in Terminal

use 'webpack -w' in Terminal to build the bundle.js file...and keep it running in background

*/