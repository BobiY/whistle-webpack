const webpackMerge = require('webpack-merge');
const OptimizeCsssasetswebpackplugin = require('optimize-css-assets-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPageCreate = require('../utils/htmlCreate');
const baseConfig = require('./webpack.base');
const htmlPages = htmlPageCreate(HtmlWebpackPlugin, baseConfig.entry); // 根据入口文件生成相应的html文件
const path = require('path');
const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCsssasetswebpackplugin({ // 压缩 css
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new FileManagerPlugin({
      onEnd: {
        archive: [
          { 
             source: path.join(baseConfig.output.path),  //把 dist 目录下的文件  
             destination: path.join(baseConfig.output.path, "example.zip"),  // 打包到 dist 文件夹下的 example.zip 中
             format: 'zip',
             options: {
               gzip: true,
               gzipOptions: {
                level: 1
               },
               globOptions: {
                nomount: true
               }
             }
           }

        ]
      }
    })
  ].concat(htmlPages),
};

module.exports = webpackMerge(baseConfig, prodConfig);
