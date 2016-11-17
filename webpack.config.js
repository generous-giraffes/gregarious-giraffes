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

  //Laurhens - please comment in this area
  debug: true,
  module: {
    loaders: [{
      //Here we say load on .js files and webpack uses babel to convert them from jsx and es2015 to javascript
      test: /\.js$/,
      loader: 'babel-loader',

      // here we simply want to ignore the node_modules or bower_components (if any) directory
      exclude: /(node_modules|bower_components)/,
      // here we are specifically telling babel what transformations we want it to do to our code via presets based on our dependencies - react, ES6
      query: {
        presets: ['es2015', 'stage-1', 'react']
      }
    },
      //added scss as a separate module and it basically compiles a CSS file
      // that renders in the browser only but does not save the file to the repository
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  }
};
/*

make sure webpack is installed globally to use webpack commands in Terminal

use 'webpack -w' in Terminal to build the bundle.js file...and keep it running in background

*/

