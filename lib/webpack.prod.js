const webpackMerge = require('webpack-merge');
const OptimizeCsssasetswebpackplugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCsssasetswebpackplugin({ // 压缩 css
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
  ]
};

module.exports = webpackMerge(baseConfig, prodConfig);
