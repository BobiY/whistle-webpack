// 打包公共库 
/**
 * 1. libraryName: 名称
 * 2. externals: {} // 配置不打进包里的模块，默认只有 react
 */
const OptimizeCsssasetswebpackplugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const bundleConfig = {
    output: {
        library: "getComponent", // 这里是公共库或者包暴露出去的名称
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    mode: 'none', // 设置mode为none避免默认压缩
    externals: {
        "react": "React"  // 不将 React 打入包内，使用时需要安装 react 作为依赖
    }
}    

const mergeConfig = webpackMerge(baseConfig, bundleConfig);
const keys = Object.keys(mergeConfig.entry); 
if (keys.length === 1) {
    // 长度为 1 说明只有一个入口文件 
    mergeConfig.entry = {
        [mergeConfig.output.library]: mergeConfig.entry[keys],
        [`${mergeConfig.output.library}.min`] : mergeConfig.entry[keys]  
    }
    mergeConfig.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin({ // 使用压缩插件
                include: /\.min\.js$/
            })
        ]   
    }
    mergeConfig.output.filename = '[name].js';
    mergeConfig.plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new FileManagerPlugin({
            onEnd: {
                delete: [ // 删除多余的 min.css 文件 
                    path.join(process.cwd(), 'dist', 'getComponent.min.css')
                ]
            }
        }),
        new OptimizeCsssasetswebpackplugin({ // 压缩 css
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
        }),
        new CleanWebpackPlugin()
    ]
}


module.exports = mergeConfig;