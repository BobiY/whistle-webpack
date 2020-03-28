// 打包公共库 
/**
 * 1. libraryName: 名称  配置文件传入OR解析 path.basename(process.cwd())
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
const libraryName = path.basename(process.cwd()); //  获取的默认的包名（以后支出传入）
const bundleConfig = {
    output: {
        library: libraryName, // 这里是公共库或者包暴露出去的名称
        libraryTarget: 'umd',
        libraryExport: 'default'  // 文件必须有默认导出，不然会访问不到
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
        [libraryName]: mergeConfig.entry[keys],
        [`${libraryName}.min`] : mergeConfig.entry[keys]  
    }
    mergeConfig.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin({ // 使用压缩插件
                include: /\.min\.js$/  // 打包一个压缩版本
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
                    path.join(process.cwd(), 'dist', `${libraryName}.min.css`)
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