const webpackMerge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPageCreate = require('../utils/htmlCreate');
const baseConfig = require('./webpack.base');
const htmlPages = htmlPageCreate(HtmlWebpackPlugin, baseConfig.entry); // 根据入口文件生成相应的html文件
const WebpackBar = require('webpackbar');
const devConfig = {
  output: {
    pathinfo: true,  // 开发模式下开启  bundle 中引入「所包含模块信息」的相关注释
  },
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
    },
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  // stats: 'errors-only',
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false
    }),
    new WebpackBar(),
  ].concat(htmlPages),
  optimization:{
    noEmitOnErrors: true
  },
  performance: {
    hints: false, // 当有资源文件过大时，比现实提示语，也不报错 
  }
};


module.exports = webpackMerge(baseConfig, devConfig);
