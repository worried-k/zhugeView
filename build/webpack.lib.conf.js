var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var env = config.lib.env

baseWebpackConfig.entry = {
  main: './src/index.js',
  panel: './src/components/panel/index.js'
}
baseWebpackConfig.output = {
  path: path.resolve(__dirname, '../lib'),
  filename: '[name].js',
  libraryTarget: 'umd'
}
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.lib.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    new CleanWebpackPlugin(['lib']),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'theme-default/[name].css'
    }),
  ]
})


module.exports = webpackConfig
