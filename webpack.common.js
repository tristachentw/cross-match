import path from 'path';
import webpack from 'webpack';
import nib from 'nib';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StylusPlugin from './stylus.plugin';

const OUTPUT_FOLDER = './dist',
      SOURCE_FOLDER = './src';

export default {
  context: path.resolve(__dirname, SOURCE_FOLDER),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, OUTPUT_FOLDER),
    filename: 'assets/app.[chunkhash:8].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: { sourceMap: true, importLoaders: 2, url: false }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true }
        }, {
          loader: 'stylus-loader',
          options: {
            sourceMap: true,
            use: [
              nib(),
              StylusPlugin(path.resolve(__dirname, SOURCE_FOLDER, 'app.json'))
            ],
            import: ['~nib/lib/nib/index.styl']
          }
        }]
      })
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      classnames: 'classnames'
    }),
    new CleanWebpackPlugin(OUTPUT_FOLDER),
    new ExtractTextPlugin('assets/app.[contenthash:8].css'),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, OUTPUT_FOLDER, 'index.html'),
      template: path.resolve(__dirname, SOURCE_FOLDER, 'index.html')
    })
  ]
};
