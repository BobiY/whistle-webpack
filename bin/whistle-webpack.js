#!/usr/bin/env node
// const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const configFile = process.argv[2] || 'webpack.config.js';
const config = require(path.join(process.cwd(), configFile));
let devServer = {};
const express = require('express');
// 获取devServer 配置，如果存在
if( config.devServer ) {
    devServer = config.devServer;
}
const complier = webpack(config);
const server = new WebpackDevServer(complier, devServer);

server.listen(8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});

// // const webpackConfig = require('./webpack.config.js')

// const DIST_DIR = path.join(process.cwd(), devServer.contentBase || "dist");// 设置静态访问文件路径
// const PORT = devServer.port || 8080; // 设置启动端口

// const complier = webpack(config); 
// if ( !Object.keys(devServer).length ) {
//     return ;
// }
// const app = express();
// app.use(webpackDevMiddleware(complier, devServer));
// // {
// //     // 这里是对 webpackDevMiddleware 的一些配置，具体其他配置我们下面已经列出来了。

// //     //绑定中间件的公共路径,与webpack配置的路径相同
// //     publicPath: webpackConfig.output.publicPath,
// //     quiet: true  //向控制台显示任何内容 
// // )


// // 这个方法和下边注释的方法作用一样，就是设置访问静态文件的路径
// app.use(express.static(DIST_DIR))

// app.listen(PORT, function (err) {
//     if (err) {
//       console.error(err)
//       return
//     }
  
//     // var protocol = https ? 'https' : 'http'
//     // console.log('Listening at ' + protocol + '://' + serverConfig.hostname + ':' + serverConfig.port)
//     console.log(`Listening at localhost:${PORT}`);
//   })