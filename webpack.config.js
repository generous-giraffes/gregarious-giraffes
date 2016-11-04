const webpack = require('webpack');
const path = require('path');

module.exports = {
  //entry point for the react app. starts in index.js in the client folder
  entry: ['./client/index.js'],
  //output for what is being bundled - going into the public folder as bundle.js
  output: {
    path: __dirname + '/client/public',
    filename: 'bundle.js'
  },
  //Lawrence - please comment in this area
  debug: true,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/,
      query: {
        presets: ['es2015', 'stage-1', 'react']
      }
    },
      //added scss as a separate module and it basically compiles a CSS file
      // that renders in the browser only but does not save the file to the repository
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      }
    ]
  }
};
/*

make sure webpack is installed globally to use webpack commands in Terminal

use 'webpack -w' in Terminal to build the bundle.js file...and keep it running in background

*/

