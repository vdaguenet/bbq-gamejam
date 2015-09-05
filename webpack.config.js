var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-stylus');
var path = require('path');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/public/build',
    filename: 'main.js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css-loader!stylus-loader')
      },
      {
        test: /\.json$/,
        include: path.join(__dirname, 'node_modules', 'pixi.js'),
        loader: 'json',
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
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
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
  eslint: {
    configFile: __dirname + '/.eslintrc'
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ]
}
