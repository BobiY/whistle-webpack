const baseConfig = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

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
    ]
}

module.exports = webpackMerge(baseConfig, devConfig);