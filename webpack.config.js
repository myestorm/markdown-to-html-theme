const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackReadPages = require('./webpack.read.pages');

const webpackReadPages = new WebpackReadPages();

let webpackPlugins = webpackReadPages.htmlWebpackPlugins;
webpackPlugins = webpackPlugins.concat([
  new MiniCssExtractPlugin({
    filename: 'styles/[name].[fullhash:6].css'
  }),
  new FriendlyErrorsWebpackPlugin(),
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['!config.json']
  })
])

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  stats: 'normal',
  entry: webpackReadPages.entrys,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name]-[fullhash:6].js'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss' ],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.join(__dirname, 'src', 'assets')
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false
    })],
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    inline: true,
    quiet: true,
    historyApiFallback: true
  },
  plugins: webpackPlugins,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
};
