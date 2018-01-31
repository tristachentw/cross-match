import webpack from 'webpack';
import Merge from 'webpack-merge';
import CommonConfig from './webpack.common.js';

export default Merge(CommonConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true
      },
      comments: false
    })
  ]
});
