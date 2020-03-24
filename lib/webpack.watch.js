// 添加 watch 相关参数

const webpackMerge = require('webpack-merge');
const prodConfig = require('./webpack.prod');
const watchOption = {
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
}

module.exports = webpackMerge(prodConfig, watchOption);