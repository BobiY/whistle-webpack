#!/usr/bin/env node
/**
 * .whistlerc.js  自定义配置文件
 * 入口文件为空检测 未实现
 */
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
var program = require('commander');
const colors = require('colors');
const version = require('../package.json'); 
const argsResolve = require('../utils/argsResolve');
program
  .version(version.version)
  .option('-m, --mode [modeString]', 'select mode in build or dev-server or watch')
  .option('-P, --port [number]', 'input server port')
  .option('-c, --config [filename]', 'webpack config file url')
  .option('-a, --create', 'create a simple app') // 创建一个简单的 app
  .parse(process.argv);

// 保存 webpack 配置
let webpackConfig = require('../lib/webpack.prod');

// 检测参数的合法性，并给与默认值
const param = argsResolve(program);

// 如果存在自定义的 config 文件，则读取配置
if( param.config ) {
  try{
    const fileOk = fs.accessSync(path.join(process.cwd(), param.config));
    webpackConfig = require(path.resolve(process.cwd(), param.config));  // 读取自定义配置
  }catch(err) {
    console.log(colors.red(`${path.resolve(process.cwd(), param.config)} 不存在，请确认文件路径后重试`));
    process.exit(2);
  }
}

// 创建简单项目目录
if ( param.create ) {
    console.log(`begin create app....`);
    const createApp = require('../utils/CopyDir');
    const sourcePath = path.join(__dirname, '../utils/template');
    const targetPath = process.cwd();
    createApp.checkDirectory(sourcePath, targetPath);
    return ;
}
const workProVersion = require(path.join(`${process.cwd()}`, 'package.json')) || {};
// 生产环境打包
if ( param.mode === "build" ) {
  // 打印打包信息
  console.log('\n');
  console.log(`> ${path.basename(process.cwd())}@${workProVersion.version} build ${process.cwd()}`)
  console.log(`> whistie-webpack@${version.version} \n\n`)
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

// 打包库的模式
if ( param.mode === "library" ) {
  webpackConfig = require('../lib/webpack.bundle');
  // 打印打包信息
  console.log('\n');
  console.log(`> ${path.basename(process.cwd())}@${workProVersion.version} build ${process.cwd()}`)
  console.log(`> whistie-webpack@${version.version} \n\n`)
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

  // 打印信息
  console.log('\n');
  console.log(`> ${path.basename(process.cwd())}@${workProVersion.version} watch ${process.cwd()}`)
  console.log(`> whistie-webpack@${version.version} \n\n`)

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
