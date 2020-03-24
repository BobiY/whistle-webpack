#!/usr/bin/env node
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
var program = require('commander');
const version = require('../package.json'); 
const argsResolve = require('../utils/argsResolve');
const colors = require('colors');
program
  .version(version.version)
  .option('-m, --mode [modeString]', 'select mode in build or dev-server or watch')
  .option('-P, --port [number]', 'input server port')
  .option('-c, --config [filename]', 'webpack config file url')
  .parse(process.argv);

// 保存 webpack 配置
let webpackConfig = require('../lib/webpack.prod');

// 检测参数的合法性，并给与默认值
const param = argsResolve(program);

// 如果存在自定义的 config 文件，则读取配置
if( param.config ) {
  try{
    const fileOk = fs.accessSync(path.join(process.cwd(), param.config));
    webpackConfig = require(path.resolve(process.cwd(), param.config));
  }catch(err) {
    console.log(colors.red(`${path.resolve(process.cwd(), param.config)} 不存在，请确认文件路径后重试`));
    process.exit(2);
  }
}

if ( param.mode === "build" ) {
  // 打包
  webpack( webpackConfig, (err, stats) => {
    if ( err ){
      console.log(err);
      process.exit(2);
    }
    // 将 webpack build 的信息打印出来
    console.log(stats.toString({
        colors: true,
        modules: false,
        children: true
    }));
  } )
}


// 本地开发模式
if(param.mode === "dev-server") {
  webpackConfig = require('../lib/webpack.dev');
  let devServer = {};
  if( webpackConfig.devServer ) {
      devServer = webpackConfig.devServer;
      delete webpackConfig.devServer;
  }
  const complier = webpack(webpackConfig);
  const server = new WebpackDevServer(complier, devServer);

  server.listen(param.port || 8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:' + (param.port || 8080));
  });  
}

// 本地监听模式
if( param.mode === "watch" ) {
  webpackConfig = require('../lib/webpack.watch');
  webpack( webpackConfig, (err, stats) => {
    if ( err ){
      console.log(err);
      process.exit(2);
    }
    // 将 webpack build 的信息打印出来
    console.log(stats.toString({
        colors: true,
        modules: false,
        children: true
    }));
  } )
};