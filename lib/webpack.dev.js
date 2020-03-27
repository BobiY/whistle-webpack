const webpackMerge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPageCreate = require('../utils/htmlCreate');
const baseConfig = require('./webpack.base');
const htmlPages = htmlPageCreate(HtmlWebpackPlugin, baseConfig.entry); // 根据入口文件生成相应的html文件

const devConfig = {
  devServer: {
    contentBase: `${baseConfig.output.path}/`,
    open: true,
    hot: true,
    port: 8080,
    compress: true,
    clientLogLevel: 'silent',
    overlay: true, // 浏览器页面上显示错误
    quiet: true,
    proxy: { // 在这里配置代理 接收任何合法的 proxy 配置
    }
  },
  mode: 'development',
  devtool: 'module-source-map',
  stats: 'errors-only',
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ].concat(htmlPages),
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true, // 开启缓存, 降低第二次构建速度
      }),
    ]
  }
};


module.exports = webpackMerge(baseConfig, devConfig);
