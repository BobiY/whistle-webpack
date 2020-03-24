const webpackMerge = require('webpack-merge');
module.exports = function getOption(evnString, option) {
    // 获取用户自定义的 option
    switch(evnString) {
        case 'development':
            // 开发相关配置
            const devCongif = require('./lib/webpack.dev');
            return devCongif; 
        case 'production':
            // 生产相关配置
            const prodConfig = require('./lib/webpack.prod');
            return prodConfig;
        case 'ssr':
        case 'dll':
            // 打包相关包的集合 react react-dom 等的集合包
        default: 
            // 默认情况下返回基础配置
            return require('./lib/webpack.base');
    }
}
