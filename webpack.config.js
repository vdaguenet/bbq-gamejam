var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-stylus');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/public/build',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css-loader!stylus-loader')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          optional: [
            'runtime'
          ]
        }
      }
    ]
  },
  resolve: {
    alias: {
      utils: __dirname + '/src/utils',
      game: __dirname + '/src/game'
    }
  },
  stylus: {
    use: [autoprefixer()]
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ]
}