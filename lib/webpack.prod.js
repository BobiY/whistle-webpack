const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const OptimizeCsssasetswebpackplugin = require('optimize-css-assets-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const htmlPageCreate = require('../utils/htmlCreate');
const baseConfig = require('./webpack.base');
const htmlPages = htmlPageCreate(HtmlWebpackPlugin, baseConfig.entry); // 根据入口文件生成相应的html文件
const path = require('path');
const prodConfig = {
  mode: 'development', 
  performance: {
    hints: 'warning',  // 有大文件打包进 bundle 时，显示一条提示信息
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({  //资源压缩选项
        parallel: true,
        cache: true, // 开启缓存, 降低第二次构建速度
        terserOptions: require(path.join(__dirname, '../utils/terserOptions')),  // 压缩配置项 来自 umi
        extractComments: false  // 不会将注释也打包成单独的 txt 文件（不开启就会出现）
      }),
    ]
  },
  plugins: [
    new webpack.IgnorePlugin({ // 忽略 .locale 和 moment 库，因为 moment 文件库太大 
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new OptimizeCsssasetswebpackplugin({ // 压缩 css
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new WebpackManifestPlugin({  // 生成资源对应 map 文件
        fileName: 'asset-manifest.json',
    }),
    new FileManagerPlugin({ // 生成压缩包文件
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
