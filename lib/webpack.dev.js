const baseConfig = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const devConfig = {
    devServer:{
        contentBase: baseConfig.output.path,
        open: true,
        color: true,
        hot: true
    },
    mode: 'development',
    devtool:'eval-cheap-source-map',
    stats: 'errors-only',
    plugins: [
        new FriendlyErrorsWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true // 开启缓存, 降低第二次构建速度
            })
        ]
    }
}


module.exports = webpackMerge(baseConfig, devConfig);