/* jshint node: true */
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, './example'),
    filename: 'sample.js',
    libraryTarget: 'umd',
    library: 'ReactFlexTabs'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  module: {
      loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
              presets: ['es2015'],
              plugins: ['transform-runtime', 'transform-class-properties']
          }
      }]
  }
};
