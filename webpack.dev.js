import path from 'path';
import Merge from 'webpack-merge';
import CommonConfig from './webpack.common.js';

export default Merge(CommonConfig, {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 7777,
    host: '0.0.0.0',
    disableHostCheck: true
  },
  devtool: 'cheap-module-source-map'
});
